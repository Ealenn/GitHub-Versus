<template>
<div id="preview">

    <div class="ui card" style="width: 100%!important;">
        <div class="ui active dimmer" v-if="repo_update">
            <div class="ui loader"></div>
        </div>

        <div class="content">
            <div class="right floated">
                <div class="ui search">
                    <div class="ui icon input">
                        <input v-model="repo_term" v-on:keyup.13="refresh($event)" autocomplete="off" class="prompt" type="text" :placeholder="title">
                        <i class="search icon"></i>
                    </div>
                </div>
            </div>
            <div class="header">{{repo.name}}</div>
            <div class="meta">
                <span class="category">{{repo.full_name}}</span><br>
                <span class="time" v-if="repo.updated_at"><i class="refresh icon"></i> {{repo.updated_at | moment}}</span>
            </div>

            <div class="description">

                <div class="row ui grid" v-if="repo.watchers != 0">
                    <div class="four wide column">
                        <div class="ui mini statistic">
                            <div class="value">
                                <i-count-up
                                    :start="0"
                                    :end="repo.stars"
                                    :decimals="0"
                                    :duration="2.5"
                                    ></i-count-up>
                            </div>
                            <div class="label">Stars</div>
                        </div>
                    </div>
                    <div class="four wide column">
                        <div class="ui mini statistic">
                            <div class="value">
                            <i-count-up
                                :start="0"
                                :end="repo.watchers"
                                :decimals="0"
                                :duration="2.5"
                                ></i-count-up>
                            </div>
                            <div class="label">Watchers</div>
                        </div>
                    </div>
                    <div class="four wide column">
                        <div class="ui mini statistic">
                            <div class="value">
                                <i-count-up
                                    :start="0"
                                    :end="repo.forks"
                                    :decimals="0"
                                    :duration="2.5"
                                    ></i-count-up>
                            </div>
                            <div class="label">Forks</div>
                        </div>
                    </div>
                    <div class="four wide column">
                        <div class="ui mini statistic">
                            <div class="value">
                                <i-count-up
                                    :start="0"
                                    :end="repo.open_issues"
                                    :decimals="0"
                                    :duration="2.5"
                                    ></i-count-up>
                            </div>
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

import ICountUp from 'vue-countup-v2';

export default {
  name: 'preview',
  props: ['title'],
  components: {
    ICountUp
  },
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

<style>

</style>