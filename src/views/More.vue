<template>
  <div class="more">
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-center flex-column mt-4">
          <div>
            <h3 class="col-2 standings pt-3">Standings</h3>
          </div>

          <div class="col-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                v-on:click="showGroupA($event)"
                type="button"
                class="btn btn-success btn-sm mr-2"
                size="sm"
                style="height: 50%"
              >
                <font-awesome-icon icon="hand-pointer"/>Group A
              </button>
              <button
                v-on:click="showGroupB($event)"
                type="button"
                class="btn btn-success btn-sm mr-2"
                size="sm"
                style="height: 50%"
              >
                <font-awesome-icon icon="hand-pointer"/>Group B
              </button>
              <button
                v-on:click="showGroupC($event)"
                type="button"
                class="btn btn-success btn-sm mr-2"
                size="sm"
                style="height: 50%"
              >
                <font-awesome-icon icon="hand-pointer"/>Group C
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="container container-second">
          <table v-if="groupA &&!groupB &&!groupC" class="table table-striped table-secondary">
            <caption>UEFA Champions League - Group A</caption>
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team</th>
                <th scope="col">Pl</th>
                <th scope="col">GD</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(s,index) in standings">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ s.team.name }}</td>
                <td>{{ s.playedGames }}</td>
                <td>{{ s.goalDifference }}</td>
                <td>{{ s.points }}</td>
              </tr>
            </tbody>
          </table>
          <table v-if="groupB &&!groupA &&!groupC" class="table table-striped table-secondary">
            <caption>UEFA Champions League - Group B</caption>
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team</th>
                <th scope="col">Pl</th>
                <th scope="col">GD</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(s, index) in standings">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ s.team.name }}</td>
                <td>{{ s.playedGames }}</td>
                <td>{{ s.goalDifference }}</td>
                <td>{{ s.points }}</td>
              </tr>
            </tbody>
          </table>
          <table v-if="groupC &&!groupA &&!groupB" class="table table-striped table-secondary">
            <caption>UEFA Champions League - Group C</caption>
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team</th>
                <th scope="col">Pl</th>
                <th scope="col">GD</th>
                <th scope="col">Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(s,index) in standings">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ s.team.name }}</td>
                <td>{{ s.playedGames }}</td>
                <td>{{ s.goalDifference }}</td>
                <td>{{ s.points }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex justify-content-center flex-column mb-3">
          <div>
            <h3 class="col-2 scorers pt-3">Scorers</h3>
          </div>
        </div>

        <div class="container container-second bg-gradient-light">
          <div class="table-header p-2 w-100 col-12 d-flex justify-content-center border-bottom">
            <span class="scorers-title">UEFA Champions League - Player Stats 2018/2019</span>
          </div>
          <div
            class="row table-scorers p-2 d-flex justify-content-around align-items-center border border-bottom"
            v-for="(s,index) in scorers"
          >
            <div class="col-4 table-scorers-name d-flex justify-content-center">{{ s.player.name }}</div>
            <div class="col-4 table-scorers-team d-flex justify-content-center">{{ s.team.name }}</div>
            <div class="col-2">
              <img class="logo" :src="teamIdLogosDict[s.team.id]" alt>
            </div>
            <div class="col-2 d-flex justify-content-center">
              <div class="table-scorers-goals">{{ s.numberOfGoals }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="p-3"></footer>
  </div>
</template>

<script>
export default {
  name: 'More',
  data () {
    return {
      allTeams: this.$route.params.teams,
      teamIdLogosDict: {},
      originalStandings: [],
      standings: [],
      scorers: [],
      groupA: null,
      groupB: null,
      groupC: null
    }
  },
  methods: {
    showGroupA: function (event) {
      this.standings = this.originalStandings
      this.groupA = true
      this.groupB = false
      this.groupC = false

      let groupATab = this.standings // [{}, {}, {}, ...]
        .filter(obj => obj.group === 'GROUP_A' && obj.type === 'TOTAL') // [{ table:[], ...}, {}, ....]
        .map(obj => obj.table) // [[], [], [], ...]

      let table = [] // [] + [1,2,3,] => [1,2,3,...]
      for (let arr of groupATab) table = table.concat(arr)

      this.standings = table
    },
    showGroupB: function (event) {
      this.standings = this.originalStandings
      this.groupB = true
      this.groupA = false
      this.groupC = false

      let groupBTab = this.standings // [{}, {}, {}, ...]
        .filter(obj => obj.group === 'GROUP_B' && obj.type === 'TOTAL') // [{ table:[], ...}, {}, ....]
        .map(obj => obj.table) // [[], [], [], ...]

      let table = [] // [] + [1,2,3,] => [1,2,3,...]
      for (let arr of groupBTab) table = table.concat(arr)

      this.standings = table
    },
    showGroupC: function (event) {
      this.standings = this.originalStandings
      this.groupC = true
      this.groupA = false
      this.groupB = false
      let groupCTab = this.standings // [{}, {}, {}, ...]
        .filter(obj => obj.group === 'GROUP_C' && obj.type === 'TOTAL') // [{ table:[], ...}, {}, ....]
        .map(obj => obj.table) // [[], [], [], ...]

      let table = [] // [] + [1,2,3,] => [1,2,3,...]
      for (let arr of groupCTab) table = table.concat(arr)

      this.standings = table
    }
  },

  created () {
    let baseURL = 'https://api.football-data.org/v2/competitions/CL/'
    let standingsParam = 'standings'
    let scorersParam = 'scorers'

    let header = { 'X-Auth-Token': 'a43af3a65b2b477c979e6b354684816b' }
    fetch(baseURL + standingsParam, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log('Request succeeded: ' + response.statusText)
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(json => {
        this.standings = json.standings
        this.originalStandings = json.standings
      })
      .catch(error => {
        console.log('Request failed: ' + error.message)
      })

    fetch(baseURL + scorersParam, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log('Request succeeded: ' + response.statusText)
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(json => {
        console.log(json.scorers)
        this.scorers = json.scorers
        let teams = this.allTeams
        for (let team of teams) {
          if (team.crestUrl) {
            this.teamIdLogosDict[team.id] = team.crestUrl
          } else {
            this.teamIdLogosDict[team.id] = ''
          }
        }
      })
      .catch(error => {
        console.log('Request failed: ' + error.message)
      })
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

h1 {
  color: firebrick;
  font-size: 60px;
}

.container {
  background-color: rgba(255, 255, 255, 0.7);
  color: darkblue;
}

.container container-second {
  background-color: rgba(255, 255, 255, 0);
}

h2 {
  color: black;
  font-weight: bold;
}

.container p {
  color: black;
  font-weight: bold;
}

h3.standings {
  color: red;
}

.scorers-title {
  font-weight: bold;
  font-size: 18px;
}

.table-scorers {
  background-color: #e9ecef;
}

.table-scorers-name {
  font-weight: bold;
  font-size: 13px;
}

.table-scorers-team {
  font-size: 11px;
}

.table-scorers-goals {
  font-weight: bold;
  font-size: 18px;
}

h3.scorers {
  color: red;
}

#scorers {
  margin-bottom: 20px;
}

img.logo {
  height: 60px;
  width: 60px;
}

font-awesome-icon {
  margin-right: 10px;
}
</style>
