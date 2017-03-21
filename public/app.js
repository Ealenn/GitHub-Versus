import Vue from 'vue'
import axios from 'axios'
import Momentjs from 'moment'
import EmptyRepo from '../config/EmptyRepo'

var app = new Vue({
  el: '#app',
  data: {
    first_repo_term: '',
    second_repo_term: '',
    first_repo: EmptyRepo,
    second_repo: EmptyRepo,
    first_repo_update: false,
    second_repo_update: false
  },
  filters: {
    moment: function (date) {
      return Momentjs(date).fromNow();
    }
  },
  methods: {
    refresh: function (isFirst, event) {
      if (event) event.preventDefault()

      /* Term */
      var term = ''
      if(isFirst) {
        this.first_repo_update = true
        term = this.first_repo_term 
      } else {
        this.second_repo_update = true
        term = this.second_repo_term
      }

      /* Get repo */
      axios.get('/api/' + term)
        .then(function (response) {
          if(isFirst){
            this.first_repo_update = false
            this.first_repo = response.data
          } else {
            this.second_repo_update = false
            this.second_repo = response.data
          }

          console.log(response.data)
        }.bind(this));
    }
  }
})