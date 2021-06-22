var app = new Vue({
  el:"#app",
  data:{
    text:'',
    data:[],
    currentPage:0,
    locations:[],
    currentLocation:'',
  },
  computed:{
    filterData(){
      const vm = this;
      // 先過濾
      let items = [];
      if(vm.currentLocation !== ''){
        items = vm.data.filter((item,i)=>{
          return item.Zone === vm.currentLocation;
        })
      }else{
        items = vm.data;
      }
      console.log(items);
      // 製作分頁
      
      const newData=[];
      items.forEach((item, i)=>{
        // 每十筆做一個分頁
        if(i % 10 === 0){
          newData.push([])
        }
        const page=parseInt(i/10);
        newData[page].push(item);
      })
      return newData;
    },
  },
  methods: {
    getUniqueList(){
      const locations = new Set(); // 陣列內容不得重複 // ES6 方法 Set() SET 屬於類陣列
      const vm = this;
      vm.data.forEach((item, i)=>{
        locations.add(item.Zone);
      })
      vm.locations = Array.from(locations);
    }
  },
  created(){
    const vm = this;
    axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
    .then(function (response) {
      // handle success
      console.log(response);
      vm.data = response.data.result.records;
      console.log(vm.data);
      vm.getUniqueList();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    }
})