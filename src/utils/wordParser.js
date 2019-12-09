import { Document, Packer, Table, TableRow, TableCell, Paragraph, UnderlineType, TextRun, Header } from 'docx'

import { saveAs } from 'file-saver'

export class WordParser {
  constructor (actionPlan) {
    this.actionPlan = actionPlan
  }

  parse () {
    let startTime = new Date()

    const doc = new Document()

    const title = new TextRun({
      text: 'FORMULARIO DE PLAN DE ACCIÓN',
      bold: true,
      underline: {
        type: UnderlineType.SINGLE
      }
    })

    const paragraph = new Paragraph({
      children: [title]
    })

    let rows = this.getRows()

    const table = new Table({
      rows
    })

    let time = (new Date() - startTime)

    doc.addSection({
      headers: {
        default: new Header({
          children: [new Paragraph('Generado automáticamente en ' + String(time) + ' milisegundos por QMS APP.')]
        })
      },
      children: [paragraph, table]
    })

    this.download(doc)
  }

  getRows () {
    let rows = []
    let rowsSize = this.getRowsSize()

    let rowIndex = 0

    let maxRowSize = Math.max.apply(Math, rowsSize) + 1

    let initialCells = []
    for (let i = 0; i < maxRowSize; i++) {
      initialCells.push(this.getCell('', true))
    }
    const initialTableRow = new TableRow({
      children: initialCells
    })

    rows.push(initialTableRow)

    for (let row of this.actionPlan.structure.rows) {
      let cells = []

      let columnIndex = 0

      for (let column of row) {
        if (column.fieldType === 'horizontal') {
          columnIndex += 2

          cells.push(this.getCell(column.name, true))

          if (columnIndex === rowsSize[rowIndex]) {
            let remainingCells = (maxRowSize - rowsSize[rowIndex]) + 1

            cells.push(this.getCell(column.value, false, remainingCells))
          } else {
            cells.push(this.getCell(column.value, false))
          }
        } else if (column.fieldType === 'title') {
          columnIndex++

          if (columnIndex === rowsSize[rowIndex]) {
            let remainingCells = (maxRowSize - rowsSize[rowIndex]) + 2

            cells.push(this.getCell(column.name, true, remainingCells))
          } else {
            cells.push(this.getCell(column.name, false))
          }
        } else if (column.fieldType === 'responsible') {
          cells.push(this.getCell(column.name, true, maxRowSize))

          const tableRowName = new TableRow({
            children: cells
          })

          rows.push(tableRowName)

          cells = []

          cells.push(this.getCell('Nombre', false))
          cells.push(this.getCell('Puesto', false))
          cells.push(this.getCell('Firma', false, maxRowSize - 2))

          rows.push(new TableRow({ children: cells }))

          if (column.value.length > 0) {
            for (let i = 0; i < column.value.length; i++) {
              let responsible = column.value[i]
              cells = []

              cells.push(this.getCell(responsible.name), false)
              cells.push(this.getCell(responsible.position), false)
              cells.push(this.getCell(responsible.signature), false, maxRowSize - 2)

              if (i !== column.value.length - 1) {
                rows.push(new TableRow({ children: cells }))
              }
            }
          }
        } else if (column.fieldType === 'corrections' || column.fieldType === 'actions') {
          cells.push(this.getCell(column.name, true, maxRowSize))

          const tableRowName = new TableRow({
            children: cells
          })

          rows.push(tableRowName)

          cells = []

          cells.push(this.getCell('Actividad', true))
          cells.push(this.getCell('Responsable', true))
          cells.push(this.getCell('Descripción', true))
          cells.push(this.getCell('Fecha propuesta', true))
          cells.push(this.getCell('Fecha real', true, maxRowSize - 4))

          rows.push(new TableRow({ children: cells }))

          if (column.value.length > 0) {
            for (let i = 0; i < column.value.length; i++) {
              let activity = column.value[i]
              cells = []

              cells.push(this.getCell(activity.name, false))
              cells.push(this.getCell(activity.responsable, false))
              cells.push(this.getCell(activity.description, false))
              cells.push(this.getCell(activity.proposedDate, false))
              cells.push(this.getCell(activity.realDate, false, maxRowSize - 4))

              if (i !== column.value.length - 1) {
                rows.push(new TableRow({ children: cells }))
              }
            }
          }
        }
      }

      rowIndex++

      const tableRow = new TableRow({
        children: cells
      })

      rows.push(tableRow)
    }

    return rows
  }

  getCell (value, shading, columnSpan = 0) {
    if (shading) {
      return new TableCell({
        children: [new Paragraph(value)],
        columnSpan: columnSpan,
        shading: {
          color: 'black',
          fill: '#D8D8D8'
        }
      })
    } else {
      return new TableCell({
        children: [new Paragraph(value)],
        columnSpan: columnSpan
      })
    }
  }

  getRowsSize () {
    let rowsSize = []

    for (let row of this.actionPlan.structure.rows) {
      let rowSize = 0

      for (let column of row) {
        if (column.fieldType === 'horizontal') {
          rowSize += 2
        } else if (column.fieldType === 'title') {
          rowSize++
        } else {
          rowSize += 5
        }
      }

      rowsSize.push(rowSize)
    }

    return rowsSize
  }

  download (doc) {
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, this.actionPlan.name + '.docx')
    })
  }
}
