import Vue from 'vue'
import axios from 'axios'
import EmptyRepo from '../config/EmptyRepo'

var app = new Vue({
  el: '#app',
  data: {
    first_repo_term: '',
    second_repo_term: '',
    first_repo: EmptyRepo,
    second_repo: EmptyRepo
  },
  methods: {
    refresh: function (isFirst, event) {
      if (event) event.preventDefault()

      /* Term */
      var term = ''
      if(isFirst) {
        $('#first_repo_loading').attr('style', 'display:bloc')
        term = this.first_repo_term 
      } else {
        $('#second_repo_loading').attr('style', 'display:bloc')
        term = this.second_repo_term
      }

      /* Get repo */
      axios.get('/api/' + term)
        .then(function (response) {
          if(isFirst){
            $('#first_repo_loading').attr('style', 'display:none')
            this.first_repo = response.data
          } else {
            $('#second_repo_loading').attr('style', 'display:none')
            this.second_repo = response.data
          }

          console.log(response.data)
        }.bind(this));
    }
  }
})