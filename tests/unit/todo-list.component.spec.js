// import { expect } from 'chai';
// import { shallowMount } from '@vue/test-utils';
// import HelloWorld from '@/components/HelloWorld.vue';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message';
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg },
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TodoListComponent from '@/components/todo-list/todo-list.component.vue';
import TodoItemComponent from '@/components/todo-item/todo-item.component.vue'
import StandardButtonComponent from '@/components/standard-button/standard-button.component.vue'
import NewTodoItemComponent from '@/components/todo-item/new-todo-item/new-todo-item.component.vue'
import * as $cookies from "vue-cookies";

describe('todo-list.component.vue', () => {
  it('renders msg', () => {
    const msg = 'Your Amazing ToDo List';
    const wrapper = shallowMount(TodoListComponent, {
      propsData: { msg },
      mocks: {
        $cookies: {
          config: () => {},
          get: () => {},
          set: () => {}
        }
      }
    })
    expect(wrapper.text()).to.include(msg);
    // const test = true;
    // expect(test).to.be.true;
  });

  it('changes sort from ascending to descending', () => {
    const wrapper = shallowMount(TodoListComponent, {
      mocks: {
        $cookies: {
          config: () => {},
          get: () => {},
          set: () => {}
        }
      }
    });
    expect(wrapper.vm.sortAscending).to.be.true;
    wrapper.find('StandardButtonComponent').trigger('click');
    expect(wrapper.vm.sortAscending).to.be.false;
  });
});
