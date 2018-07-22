import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() sendTotalNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendNewPostNumber: EventEmitter<number> = new EventEmitter<number>();

  @Input() newItem: any;
  @Input() isCollapsed: boolean;

  today: number = Date.now();
  // Number of posts to be shown at once
  limit = 3;
  newPostNumber = 0;
  currentItem = {};

  postClick(data) {
    var modal = document.getElementById('myModal1');
    // Once open, the post is no longer 'new'
    if (data.new === true) {
      data.new = false;
      this.checkNewPostNumber();
    }
    // assign currentItem as current data to show it on Modal
    this.currentItem = data;
    
    modal.style.display = 'block';
  }
  onModalClick(event) {
    var modal = document.getElementById('myModal1');
    var close = document.getElementsByClassName('close')[0];
    if (event.target === modal || event.target === close) {
      modal.style.display = "none";
    }
  }
  
  items = [
    {
      imageSrc: '../../assets/sample-icon-1.png',
      title: 'Cority UI Test',
      description: 'May the odds be ever in your favor',
      post: 'Lorem ipsum dolor sit amet, pro et erat mutat, \
      no nisl mollis dignissim eum. Facer inimicus te vis, id \
      vix nostro tamquam, qui ne iudico decore utroque. Has movet \
      quaeque an, eu vis elit vocent oporteat. No ius fabellas consetetur, \
      tantas discere per ei, vocibus appareat an sit. Mel te hinc laoreet necessitatibus, \
      ius habeo labitur petentium in.',
      date: this.today,
      new: true
    },
    {
      imageSrc: '',
      title: 'post 2',
      description: 'this is a sample post 2',
      post: 'Short post! No need for truncation',
      date: Date.UTC(2018, 6, 30),
      new: false
    },
    {
      imageSrc: '../../assets/sample-icon-2.png',
      title: 'post 3',
      description: 'this is a sample post 3',
      post: 'Long Post! Will need to be truncated. Might cut off halfway so beware!',
      date: Date.UTC(2018, 5, 21),
      new: false
    },
    {
      title: 'Load More',
      description: 'You have triggered Load More!',
      post: 'Ah I see you have exceeded your previous limits. Welcome to Load More!',
      date: Date.UTC(2015, 2, 22),
      new: false
    }
  ]

  // Truncate long posts
  truncate(val) {
    let maxLength = 50;
    if (val.length > maxLength) {
      val = val.substring(0, maxLength);
      val = val + '...';
    }
    return val;
  }

  deleteItem(item) {
    this.items = this.items.filter( element =>
      element !== item 
    );  
    // Re-using the same checker from ngOnChanges() because when it comes to arrays,
    // ngOnChanges() only looks at arry reference changes. Hence, deleting and re-setting it to
    // the same array won't trigger that method. (using Object.assign() will crash list.component.html)
    this.checkNewPostNumber();
    this.sendTotalNumber.emit(this.items.length);

    console.log(item.title + ' deleted!');
  }
  constructor() { }

  ngOnChanges(...args: any[]){
    console.log('onChange fired');
    
    // To send number of items to parent on load

    // This will trigger when a user adds a post
    if (this.newItem.title !== undefined)
    {
      this.items.unshift({
        'imageSrc': '',
        'title': this.newItem.title,
        'description': this.newItem.description,
        'post': this.newItem.post,
        'date': this.today,
        'new': true
      });
      // Clearing newItem content upon adding it to the original array since ngOnChanges() will be 
      // maintained throughout if not cleared (triggered by parent component)
      this.newItem = [];
      console.log('New Item succesfully added!');
    }
    
    this.checkNewPostNumber();
    this.sendTotalNumber.emit(this.items.length);
  }

  // To check how many new posts there are
  private checkNewPostNumber() {
    let temp = 0;
    // Check for new posts
    this.items.forEach(item => {
      if (item.new === true) temp++;
    }); 
    this.newPostNumber = temp;
    this.sendNewPostNumber.emit(this.newPostNumber);
  }

  loadMorePosts() {
    this.limit += 3;
  }

  ngOnInit() {
    // console.log(navigator.userAgent);
  }

}
