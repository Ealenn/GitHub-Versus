<template>
<div id="preview">
    <div class="ui form">
        <div class="field">
            <label>{{title}}</label>
            <input v-model="repo_term" v-on:keyup.13="refresh($event)" type="text" autocomplete="off">
        </div>
    </div>

    <div class="ui card" style="width: 100%!important;">
        <div class="ui active dimmer" v-if="repo_update">
            <div class="ui loader"></div>
        </div>

        <div class="content">
            <div class="header">{{repo.name}}</div>
            <div class="meta">
                <span class="right floated time" v-if="repo.updated_at"><i class="refresh icon"></i> {{repo.updated_at | moment}}</span>
                <span class="category">{{repo.full_name}}</span>
            </div>

            <div class="description">
                <div v-if="repo.watchers != 0">
                    <div class="row centered row" style="text-align: center;">
                        <div class="ui mini statistic">
                            <div class="value">{{repo.stars}}</div>
                            <div class="label">Stars</div>
                        </div>

                        <div class="ui mini statistic">
                            <div class="value">{{repo.watchers}}</div>
                            <div class="label">Watchers</div>
                        </div>
                    </div>

                    <div class="row centered row" style="text-align: center;">
                        <div class="ui mini statistic">
                            <div class="value">{{repo.forks}}</div>
                            <div class="label">Forks</div>
                        </div>

                        <div class="ui mini statistic">
                            <div class="value">{{repo.open_issues}}</div>
                            <div class="label">Open Issues</div>
                        </div>
                    </div>
                </div>

                <p>{{repo.description}}</p>
                <p><a :href="repo.url">{{repo.url}}</a></p>
            </div>
        </div>

        <div class="extra content">
            <div class="right floated">
                {{repo.language}}
            </div>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios'
import Momentjs from 'moment'
import EmptyRepo from '../../config/EmptyRepo'

export default {
  name: 'preview',
  props: ['title'],
  data() {
      return {
        repo_term: '',
        repo: EmptyRepo,
        repo_update: false,
    }
  },
  filters: {
    moment: function (date) {
      return Momentjs(date).fromNow();
    }
  },
  methods: {
    refresh: function (event) {
      if (event) event.preventDefault()
      this.repo_update = true

      axios.get('/api/' + this.repo_term)
        .then(function (response) {
            this.repo_update = false
            this.repo = response.data
            this.$emit('input', response.data)
        }.bind(this));
    }
  }
}
</script>

<style></style>