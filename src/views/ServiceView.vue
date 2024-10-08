<template>
  <div id="service-page" class="container-padding">
    <div id="map-container">
      <!-- 搜索输入框和按钮 -->
      <div class="search-section">
        <input
          type="text"
          id="search-input"
          placeholder="Search for a place..."
          v-model="searchQuery"
        />
        <button @click="searchPlace">Search</button>
        <button @click="clearMarkers">Clear Markers</button>
      </div>

      <!-- 起点和终点输入框及按钮 -->
      <div class="route-section">
        <input type="text" id="start-input" placeholder="Start location" v-model="startLocation" />
        <input type="text" id="end-input" placeholder="End location" v-model="endLocation" />
        <button @click="navigateRoute">Get Route</button>
      </div>

      <!-- 地图容器 -->
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default {
  name: 'ServicePage',
  setup() {
    // 定义响应式数据
    const map = ref(null) // 地图实例
    const searchQuery = ref('') // 搜索的地点名称
    const startLocation = ref('') // 起点位置
    const endLocation = ref('') // 终点位置
    const markers = ref([]) // 地图标记

    // 初始化地图
    const initializeMap = () => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZ2hhb2JvIiwiYSI6ImNtMXo4dnpxYjA0Z3Uya29oNmR6cTBqYjUifQ.MqNrRu8sKa7NhN5yVrTAyA'
      map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // 初始中心位置
        zoom: 9 // 初始缩放级别
      })

      // 添加导航控件
      map.value.addControl(new mapboxgl.NavigationControl())
    }

    // 搜索地点
    const searchPlace = async () => {
      if (!searchQuery.value) return

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()
      const place = data.features[0]

      if (place) {
        const [lng, lat] = place.center
        map.value.flyTo({ center: [lng, lat], zoom: 12 })

        addMarker([lng, lat], place.place_name)
      }
    }

    // 在地图上添加标记
    const addMarker = (coords, description) => {
      const marker = new mapboxgl.Marker()
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${description}</h3>`))
        .addTo(map.value)

      markers.value.push(marker)
    }

    // 清除地图上的所有标记
    const clearMarkers = () => {
      markers.value.forEach((marker) => marker.remove())
      markers.value = []
    }

    // 获取坐标
    const getCoordinates = async (location) => {
      if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(location)) {
        return location
      }

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        return `${lng},${lat}`
      }
      return null
    }

    // 路线导航
    const navigateRoute = async () => {
      if (!startLocation.value || !endLocation.value) {
        alert('Please enter both start and end locations.')
        return
      }

      const startCoords = await getCoordinates(startLocation.value)
      const endCoords = await getCoordinates(endLocation.value)

      if (!startCoords || !endCoords) {
        alert('Unable to find coordinates for the given locations.')
        return
      }

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates

        if (map.value.getSource('route')) {
          map.value.removeLayer('route')
          map.value.removeSource('route')
        }

        map.value.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        })

        map.value.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5
          }
        })

        const bounds = route.reduce(
          (b, coord) => b.extend(coord),
          new mapboxgl.LngLatBounds(route[0], route[0])
        )
        map.value.fitBounds(bounds, { padding: 20 })
      } else {
        alert('No route found. Please check your locations.')
      }
    }

    // 使用 onMounted 来替代 Vue 2 中的 mounted
    onMounted(() => {
      initializeMap()
    })

    return {
      searchQuery,
      startLocation,
      endLocation,
      searchPlace,
      navigateRoute,
      clearMarkers
    }
  }
}
</script>

<!-- 实现了导航，删除了搜索 -->
<!-- <script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  name: 'ServicePage',
  data() {
    return {
      map: null, // 保存地图实例
      searchQuery: '', // 搜索的地点名称
      startLocation: '', // 起点位置
      endLocation: '', // 终点位置
      markers: [] // 保存地图上的标记
    }
  },
  mounted() {
    // 初始化地图
    this.initializeMap()
  },
  methods: {
    // 初始化地图
    initializeMap() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZ2hhb2JvIiwiYSI6ImNtMXo4dnpxYjA0Z3Uya29oNmR6cTBqYjUifQ.MqNrRu8sKa7NhN5yVrTAyA'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // 地图样式
        center: [-74.5, 40], // 初始中心位置
        zoom: 9 // 初始缩放级别
      })

      // 添加导航控件
      this.map.addControl(new mapboxgl.NavigationControl())
    },
    async getCoordinates(location) {
      if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(location)) {
        return location
      }
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        return `${lng},${lat}`
      }
      return null
    },
    async navigateRoute() {
      if (!this.startLocation || !this.endLocation) {
        alert('Please enter both start and end locations.')
        return
      }

      const startCoords = await this.getCoordinates(this.startLocation)
      const endCoords = await this.getCoordinates(this.endLocation)

      if (!startCoords || !endCoords) {
        alert('Unable to find coordinates for the given locations.')
        return
      }

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates

        if (this.map.getSource('route')) {
          this.map.removeLayer('route')
          this.map.removeSource('route')
        }

        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        })

        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5
          }
        })

        const bounds = route.reduce(
          (b, coord) => b.extend(coord),
          new mapboxgl.LngLatBounds(route[0], route[0])
        )
        this.map.fitBounds(bounds, { padding: 20 })
      } else {
        alert('There is no route between two places')
      }
    }
  }
}
</script> -->

<!-- 实现了搜索，没有导航功能 -->
<!-- <script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  name: 'ServicePage',
  data() {
    return {
      map: null, // 保存地图实例
      searchQuery: '', // 搜索的地点名称
      startLocation: '', // 起点位置
      endLocation: '', // 终点位置
      markers: [], // 保存地图上的标记
      directions: null // 保存路线导航实例
    }
  },
  mounted() {
    // 初始化地图
    this.initializeMap()
  },
  methods: {
    // 初始化地图
    initializeMap() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiZ2hhb2JvIiwiYSI6ImNtMXo4dnpxYjA0Z3Uya29oNmR6cTBqYjUifQ.MqNrRu8sKa7NhN5yVrTAyA'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // 地图样式
        center: [-74.5, 40], // 初始中心位置
        zoom: 9 // 初始缩放级别
      })

      // 添加导航控件
      this.map.addControl(new mapboxgl.NavigationControl())
    },
    // 搜索地点
    async searchPlace() {
      if (!this.searchQuery) return

      // 使用 Mapbox Geocoding API 进行地点搜索
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()
      const place = data.features[0]

      if (place) {
        // 将地图中心移动到搜索到的位置
        const [lng, lat] = place.center
        this.map.flyTo({ center: [lng, lat], zoom: 12 })

        // 添加标记
        this.addMarker([lng, lat], place.place_name)
      }
    },
    // 在地图上添加标记
    addMarker(coords, description) {
      const marker = new mapboxgl.Marker()
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${description}</h3>`)) // 添加弹出框
        .addTo(this.map)

      this.markers.push(marker)
    },
    // 清除地图上的所有标记
    clearMarkers() {
      this.markers.forEach((marker) => marker.remove())
      this.markers = []
    },
    // 路线导航
    async navigateRoute() {
      if (!this.startLocation || !this.endLocation) return

      // 调用 Mapbox Directions API 获取路线
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${this.startLocation};${this.endLocation}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates

        // 使用 GeoJSON 绘制路线
        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        })

        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5
          }
        })

        // 缩放视图至路线范围
        const bounds = route.reduce(
          (b, coord) => b.extend(coord),
          new mapboxgl.LngLatBounds(route[0], route[0])
        )
        this.map.fitBounds(bounds, { padding: 20 })
      }
    }
  }
}
</script> -->

<!-- <style scoped>
#map-container {
  position: relative;
  width: 100%;
  height: 600px;
}
#map {
  width: 100%;
  height: 100%;
}
#search-input,
.route-inputs input {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 300px;
  margin: 5px;
  padding: 8px;
  z-index: 999;
}
button {
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 999;
  padding: 8px;
}
.route-inputs {
  position: absolute;
  top: 100px;
  left: 10px;
  z-index: 999;
}
</style> -->

<style scoped>
.container-padding {
  padding-top: 70px; /* 避免与固定导航栏重叠 */
}

#map-container {
  position: relative;
  width: 100%;
  height: 600px;
}

/* 控件样式 */
.search-section,
.route-section {
  display: flex; /* 使用 flex 布局使输入框和按钮水平对齐 */
  align-items: center; /* 垂直居中对齐 */
  margin: 10px;
}

#search-input,
#start-input,
#end-input {
  margin-right: 10px; /* 输入框与按钮之间的间距 */
  padding: 5px;
  flex: 1; /* 自动调整输入框宽度 */
}

button {
  padding: 8px 15px; /* 按钮的内边距 */
}

#map {
  width: 100%;
  height: 100%;
}
</style>
