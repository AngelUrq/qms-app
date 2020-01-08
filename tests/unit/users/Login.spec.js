import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Login from '@/views/users/Login.vue'
import vuetify from 'vuetify'

describe('Login.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(vuetify)

    wrapper = shallowMount(Login, {
      localVue
    })
  })

  it('exists username field', () => {
    expect(wrapper.find('#username').exists()).to.equal(true)
  })

  it('exists password field', () => {
    expect(wrapper.find('#password').exists()).to.equal(true)
  })

  it('exists login button', () => {
    expect(wrapper.find('#login-button').exists()).to.equal(true)
  })
})
