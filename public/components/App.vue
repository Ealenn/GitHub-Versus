<template>
<div id="app">
    <h2 class="ui center aligned icon header" style="margin-top:15px">
        <i class="circular github alternate icon"></i>
        GitHub Versus
    </h2>
    
    <div class="ui container" style="margin: 15px;">
        <div class="ui icon info message" v-if="first_repo.watchers == 0 || second_repo.watchers == 0">
            <i class="info icon"></i>
            <div class="content">
                <div class="header">How to use ?</div>
                <p>In the first search field, enter the name of repository you wish to compare and press enter. Then, start again for the second field !</p>
            </div>
        </div>
    </div>

    <div class="ui two column doubling stackable grid container ">
        <div class="column">
            <preview title="First repository" v-model="first_repo""></preview>
        </div>

        <div class="column">
            <preview title="Second repository" v-model="second_repo"></preview>
        </div>
    </div>

    <div class="ui container" style="margin: 15px;">
        <table class="ui striped selectable table" v-if="first_repo.name && second_repo.name">
        <thead>
            <tr>
            <th>#</th>
            <th>{{first_repo.name}}</th>
            <th>{{second_repo.name}}</th>
            <th>Gap</th>
            <th>Winner</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Stars</td>
                <td>{{first_repo.stars}}</td>
                <td>{{second_repo.stars}}</td>
                <td v-if="first_repo.stars > second_repo.stars">{{first_repo.stars - second_repo.stars}}</td>
                <td v-if="first_repo.stars < second_repo.stars">{{second_repo.stars - first_repo.stars}}</td>
                <td v-if="first_repo.stars == second_repo.stars">0</td>
                
                <td v-if="first_repo.stars > second_repo.stars">{{first_repo.name}}</td>
                <td v-if="first_repo.stars < second_repo.stars">{{second_repo.name}}</td>
                <td v-if="first_repo.stars == second_repo.stars"></td>
            </tr>
            <tr>
                <td>Watchers</td>
                <td>{{first_repo.watchers}}</td>
                <td>{{second_repo.watchers}}</td>
                <td v-if="first_repo.watchers > second_repo.watchers">{{first_repo.watchers - second_repo.watchers}}</td>
                <td v-if="first_repo.watchers < second_repo.watchers">{{second_repo.watchers - first_repo.watchers}}</td>
                <td v-if="first_repo.watchers == second_repo.watchers">0</td>
                
                <td v-if="first_repo.watchers > second_repo.watchers">{{first_repo.name}}</td>
                <td v-if="first_repo.watchers < second_repo.watchers">{{second_repo.name}}</td>
                <td v-if="first_repo.watchers == second_repo.watchers"></td>
            </tr>
            <tr>
                <td>Forks</td>
                <td>{{first_repo.forks}}</td>
                <td>{{second_repo.forks}}</td>
                <td v-if="first_repo.forks > second_repo.forks">{{first_repo.forks - second_repo.forks}}</td>
                <td v-if="first_repo.forks < second_repo.forks">{{second_repo.forks - first_repo.forks}}</td>
                <td v-if="first_repo.forks == second_repo.forks">0</td>
                
                <td v-if="first_repo.forks > second_repo.forks">{{first_repo.name}}</td>
                <td v-if="first_repo.forks < second_repo.forks">{{second_repo.name}}</td>
                <td v-if="first_repo.forks == second_repo.forks"></td>
            </tr>
            <tr>
                <td>Issues</td>
                <td>{{first_repo.open_issues}}</td>
                <td>{{second_repo.open_issues}}</td>
                <td v-if="first_repo.open_issues > second_repo.open_issues">{{first_repo.open_issues - second_repo.open_issues}}</td>
                <td v-if="first_repo.open_issues < second_repo.open_issues">{{second_repo.open_issues - first_repo.open_issues}}</td>
                <td v-if="first_repo.open_issues == second_repo.open_issues">0</td>
                
                <td v-if="first_repo.open_issues < second_repo.open_issues">{{first_repo.name}}</td>
                <td v-if="first_repo.open_issues > second_repo.open_issues">{{second_repo.name}}</td>
                <td v-if="first_repo.open_issues == second_repo.open_issues"></td>
            </tr>
            <tr>
                <td>Update</td>
                <td>{{first_repo.updated_at | moment}}</td>
                <td>{{second_repo.updated_at | moment}}</td>
                <td>-</td>
                
                <td v-if="first_repo.updated_at > second_repo.updated_at">{{first_repo.name}}</td>
                <td v-if="first_repo.updated_at < second_repo.updated_at">{{second_repo.name}}</td>
                <td v-if="first_repo.updated_at == second_repo.updated_at"></td>
            </tr>
            <tr>
                <td>Downloads</td>
                <td><img :src="'https://poser.pugx.org/' + first_repo.full_name + '/downloads?format=flat-square'"/></td>
                <td><img :src="'https://poser.pugx.org/' + second_repo.full_name + '/downloads?format=flat-square'"/></td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>Stable</td>
                <td><img :src="'https://poser.pugx.org/' + first_repo.full_name + '/v/stable?format=flat-square'"/></td>
                <td><img :src="'https://poser.pugx.org/' + second_repo.full_name + '/v/stable?format=flat-square'"/></td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>License</td>
                <td><img :src="'https://poser.pugx.org/' + first_repo.full_name + '/license?format=flat-square'"/></td>
                <td><img :src="'https://poser.pugx.org/' + second_repo.full_name + '/license?format=flat-square'"/></td>
                <td>-</td>
                <td>-</td>
            </tr>
        </tbody>
        </table>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Momentjs from 'moment'
import EmptyRepo from '../../config/EmptyRepo'

import Preview from '../components/Preview.vue'

export default {
  name: 'app',
  components: {Preview},
  data() {
      return {
        first_repo: EmptyRepo,
        second_repo: EmptyRepo,
    }
  },
  filters: {
    moment: function (date) {
      return Momentjs(date).fromNow();
    }
  },
  methods: {

  }
}
</script>

<style>
.divider-column {
  position: relative;
  padding: 0 !important;
}
</style>
