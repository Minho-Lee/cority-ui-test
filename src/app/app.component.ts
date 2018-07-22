import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  header = 'List Name';
  addingNewPost = false;
  totalPostNum = 0;
  newPostNum = 0;
  itemToPass = [];
  isCollapsed = false;

  getTotalNumber(posts: number){
    this.totalPostNum = posts;
  }
  getNewPostNumber(newPosts: number){
    this.newPostNum = newPosts;
  }

  addNewPost() {
    this.addingNewPost = !this.addingNewPost;
  }

  collapsePosts() {
    this.isCollapsed = !this.isCollapsed;
  }

  submitNewPost(form: NgForm, event) {
    event.preventDefault();
    
    if (form.valid){
      this.addingNewPost = !this.addingNewPost;
      this.itemToPass = form.value;
      console.log('Form Submitted!');
    }
  }
}
