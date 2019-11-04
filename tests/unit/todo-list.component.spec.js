// import { expect } from 'chai';
// import { mount } from '@vue/test-utils';
// import TodoListComponent from '@/components/todo-list/todo-list.component.vue';
// import StandardButtonComponent from '@/components/standard-button/standard-button.component.vue';
// import TodoTaskComponent from '@/components/todo-task/todo-task.component.vue';

// describe('todo-list.component.vue', () => {
  // let wrapper;
  // const msg = 'Your Amazing ToDo List';
  // before(() => {
  //   wrapper = mount(TodoListComponent, {
  //     propsData: { msg },
  //     mocks: {
  //       $cookies: {
  //         config: () => {},
  //         get: () => {},
  //         set: () => {},
  //       },
  //     },
  //   });
  // });
  // it('renders msg', () => {
  //   expect(wrapper.text()).to.include(msg);
  // });

  // it('has three buttons', () => {
  //   expect(wrapper.findAll(StandardButtonComponent).length).to.equal(3);
  // });

  // it('shows new todo task creation upon button click', () => {
  //   expect(wrapper.findAll(TodoTaskComponent).length).to.equal(3);
  //   wrapper.find('#add-button').trigger('click');
  //   expect(wrapper.findAll(TodoTaskComponent).length).to.equal(4);
  // });

  // it('changes sort from ascending to descending', () => {
  //   // expect(wrapper.vm.sortAscending()).to.be.true;
  //   wrapper.find('#sort-button').trigger('click');
  //   // expect(wrapper.vm.sortAscending()).to.be.false;
  // });
// });

// describe('todo-task.component.vue', () => {
//   it('changes completion from false to true', () => {
//     const todoTask = { complete: false };
//     const wrapper = mount(TodoTaskComponent, {
//       propsData: { todoTask },
//     });
//     // expect(wrapper.vm.todoTask.complete()).to.be.false;
//     wrapper.find('.complete-icon').trigger('click');
//     // expect(wrapper.vm.todoTask.complete).to.be.true;
//   });
// });
