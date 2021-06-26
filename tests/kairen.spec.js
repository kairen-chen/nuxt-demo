import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { setupTest, get, createPage } from '@nuxt/test-utils';
import Logo from '@/components/AppLogo.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';


// const localVue = createLocalVue();
// localVue.use(VueRouter);
// const router = new VueRouter(
//   {
//     mode: 'history',
//     // base: process.env.BASE_URL,
//     routes: [
//       // {name:'product-PI', path: '/test', component: Logo },
      
//     ]
//   }
// );



describe('Logo', () => {
  setupTest({ 
    browser: false,
    server: true ,
    setupTimeout: 120000
  })

  test('@@@ renders the index page @@@', async () => {
    const page = await createPage('/')
    const html = await page.innerHTML('body')
    expect(html).toContain('application')
  })

  

  it('@@@ Logo page @@@', async () => {
    // const Logo_wrapper =await mount(Logo, { localVue, router })
    global.bus = new Vue();
    const Logo_wrapper =await mount(Logo, {
      mocks: {
        $router: {
          history: {
            current: {
              name: 'product-PI'
            }
          }
        }
      }
    })
    expect(Logo_wrapper.text()).toContain('可透過我改變父值')
    expect(Logo_wrapper.vm.$router.history.current.name).toBe("product-PI")
  })
})