import { Document, Packer, Table, TableRow, TableCell, Paragraph } from 'docx'

import { saveAs } from 'file-saver'

export class WordParser {
  constructor (actionPlan) {
    this.actionPlan = actionPlan
  }

  parse () {
    const doc = new Document()

    let rows = this.getRows()

    const table = new Table({
      rows
    })

    doc.addSection({
      children: [table]
    })

    this.download(doc)
  }

  getRows () {
    let rows = []
    let rowsSize = this.getRowsSize()

    let rowIndex = 0

    let maxRowSize = Math.max.apply(Math, rowsSize) + 1

    for (let row of this.actionPlan.structure.rows) {
      let cells = []

      let columnIndex = 0

      for (let column of row) {
        if (column.fieldType === 'horizontal') {
          columnIndex += 2

          cells.push(new TableCell({
            children: [new Paragraph(column.name)],
            shading: {
              color: 'black',
              fill: '#D8D8D8'
            }
          }))

          if (columnIndex === rowsSize[rowIndex]) {
            let remainingCells = (maxRowSize - rowsSize[rowIndex]) + 1

            cells.push(new TableCell({
              children: [new Paragraph(column.value)], columnSpan: remainingCells
            }))
          } else {
            cells.push(new TableCell({ children: [new Paragraph(column.value)] }))
          }
        } else if (column.fieldType === 'vertical') {
          columnIndex++

          let remainingCells = (maxRowSize - rowsSize[rowIndex]) + 2

          cells.push(new TableCell({
            children: [new Paragraph(column.name)],
            columnSpan: remainingCells,
            shading: {
              color: 'black',
              fill: '#D8D8D8'
            }
          }))

          const tableRow = new TableRow({
            children: cells
          })

          rows.push(tableRow)

          cells = []

          cells.push(new TableCell({
            children: [new Paragraph(column.value)],
            columnSpan: remainingCells
          }))
        } else if (column.fieldType === 'title') {
          columnIndex++

          if (columnIndex === rowsSize[rowIndex]) {
            let remainingCells = (maxRowSize - rowsSize[rowIndex]) + 2

            cells.push(new TableCell({
              children: [new Paragraph(column.name)],
              columnSpan: remainingCells,
              shading: {
                color: 'black',
                fill: '#D8D8D8'
              }
            }))
          } else {
            cells.push(new TableCell({ children: [new Paragraph(column.name)] }))
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

  getRowsSize () {
    let rowsSize = []

    for (let row of this.actionPlan.structure.rows) {
      let rowSize = 0

      for (let column of row) {
        if (column.fieldType === 'horizontal') {
          rowSize += 2
        } else if (column.fieldType === 'title' || column.fieldType === 'vertical') {
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
