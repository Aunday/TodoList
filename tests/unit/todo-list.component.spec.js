import { expect } from 'chai';
import { shallowMount, mount } from '@vue/test-utils';
import TodoListComponent from '@/components/todo-list/todo-list.component.vue';
import StandardButtonComponent from '@/components/standard-button/standard-button.component.vue';
import NewTodoItemComponent from '@/components/todo-item/new-todo-item/new-todo-item.component.vue';
import * as $cookies from "vue-cookies";
import TodoItemComponent from '@/components/todo-item/todo-item.component.vue';

describe('todo-list.component.vue', () => {
    let wrapper;
    const msg = 'Your Amazing ToDo List';
    before(() => {
        wrapper = mount(TodoListComponent, {
            propsData: { msg },
            mocks: {
                $cookies: {
                config: () => {},
                get: () => {},
                set: () => {}
                }
            }
        });
    })
    it('renders msg', () => {
        expect(wrapper.text()).to.include(msg);
    });
    
    it('has three buttons', () => {
        expect(wrapper.findAll(StandardButtonComponent).length).to.equal(3);
    });

    it('shows new todo item creation upon button click', () => {
        expect(wrapper.findAll(NewTodoItemComponent).length).to.equal(0);
        wrapper.find("#add-button").trigger('click');
        expect(wrapper.findAll(NewTodoItemComponent).length).to.equal(1);
    });

    it('changes sort from ascending to descending', () => {
        expect(wrapper.vm.sortAscending).to.be.true;
        wrapper.find("#sort-button").trigger('click');
        expect(wrapper.vm.sortAscending).to.be.false;
    });
});

describe('todo-item.component.vue', () => {
    it('changes completion from false to true', () => {
        const todoItem = {complete: false};
        const wrapper = mount(TodoItemComponent, {
            propsData: { todoItem },
        });
        expect(wrapper.vm.todoItem.complete).to.be.false;
        wrapper.find(".complete-icon").trigger('click');
        expect(wrapper.vm.todoItem.complete).to.be.true;
    });
});
