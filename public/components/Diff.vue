<template>

<span :class="diff.color">
    {{ diff.sign }}
    <i-count-up
        :start="0"
        :end="diff.diff"
        :decimals="0"
        :duration="2.5"
        ></i-count-up>
</span>

</template>

<script>
import ICountUp from 'vue-countup-v2';

export default {
  name: 'diff',
  components: {
    ICountUp
  },
  props: ['me', 'keyDiff'],
  computed: {
      diff(){
        var me = this.me
        var key = this.keyDiff
        var first = this.$parent.$parent.$data.first_repo
        var second = this.$parent.$parent.$data.second_repo

        var response = {}

        if(me.full_name == first.full_name){
            if(me[key] > second[key]){
                response.color = 'ui message green center aligned'
                response.sign = '+'
                response.diff = me[key] - second[key]
            } else {
                response.color = 'ui message red center aligned'
                response.sign = '-'
                response.diff = second[key] - me[key]
            }
        } else {
            if(me[key] > first[key]){
                response.color = 'ui message green center aligned'
                response.sign = '+'
                response.diff = me[key] - first[key]
            } else {
                response.color = 'ui message red center aligned'
                response.sign = '-'
                response.diff = first[key] - me[key]
            }
        }

        return response
      }
  }
}
</script>

<style>

</style>