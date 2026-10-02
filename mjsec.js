
let map = null;
let marker = null;

// 1. 대한민국 주요 시·군·구 전체 매핑 테이블 (수백 개 도시 포함)
const KOREA_CITIES = {
  // --- 특별시 / 광역시 ---
  '서울': { lat: 37.5665, lon: 126.9780, name: '서울특별시' },
  'seoul': { lat: 37.5665, lon: 126.9780, name: '서울특별시' },
  '부산': { lat: 35.1796, lon: 129.0756, name: '부산광역시' },
  'busan': { lat: 35.1796, lon: 129.0756, name: '부산광역시' },
  '인천': { lat: 37.4563, lon: 126.7052, name: '인천광역시' },
  'incheon': { lat: 37.4563, lon: 126.7052, name: '인천광역시' },
  '대구': { lat: 35.8714, lon: 128.6014, name: '대구광역시' },
  'daegu': { lat: 35.8714, lon: 128.6014, name: '대구광역시' },
  '대전': { lat: 36.3504, lon: 127.3845, name: '대전광역시' },
  'daejeon': { lat: 36.3504, lon: 127.3845, name: '대전광역시' },
  '광주': { lat: 35.1595, lon: 126.8526, name: '광주광역시' },
  'gwangju': { lat: 35.1595, lon: 126.8526, name: '광주광역시' },
  '울산': { lat: 35.5384, lon: 129.3114, name: '울산광역시' },
  'ulsan': { lat: 35.5384, lon: 129.3114, name: '울산광역시' },
  '세종': { lat: 36.4800, lon: 127.2890, name: '세종특별자치시' },

  // --- 경기도 ---
  '수원': { lat: 37.2636, lon: 127.0286, name: '수원시' },
  '용인': { lat: 37.2410, lon: 127.1779, name: '용인시' },
  '성남': { lat: 37.4200, lon: 127.1265, name: '성남시' },
  '분당': { lat: 37.3827, lon: 127.1189, name: '성남시 분당구' },
  '고양': { lat: 37.6584, lon: 126.8320, name: '고양시' },
  '일산': { lat: 37.6582, lon: 126.7701, name: '고양시 일산' },
  '부천': { lat: 37.5034, lon: 126.7660, name: '부천시' },
  '화성': { lat: 37.1995, lon: 126.8313, name: '화성시' },
  '동탄': { lat: 37.2002, lon: 127.0740, name: '화성시 동탄' },
  '남양주': { lat: 37.6360, lon: 127.2165, name: '남양주시' },
  '안산': { lat: 37.3219, lon: 126.8309, name: '안산시' },
  '평택': { lat: 36.9921, lon: 127.1129, name: '평택시' },
  '안양': { lat: 37.3943, lon: 126.9568, name: '안양시' },
  '시흥': { lat: 37.3802, lon: 126.8029, name: '시흥시' },
  '파주': { lat: 37.7601, lon: 126.7800, name: '파주시' },
  '김포': { lat: 37.6153, lon: 126.7157, name: '김포시' },
  '의정부': { lat: 37.7381, lon: 127.0337, name: '의정부시' },
  '광명': { lat: 37.4786, lon: 126.8646, name: '광명시' },
  '하남': { lat: 37.5393, lon: 127.2148, name: '하남시' },
  '군포': { lat: 37.3614, lon: 126.9352, name: '군포시' },
  '오산': { lat: 37.1498, lon: 127.0772, name: '오산시' },
  '양주': { lat: 37.7853, lon: 127.0458, name: '양주시' },
  '이천': { lat: 37.2723, lon: 127.4350, name: '이천시' },
  '구리': { lat: 37.5943, lon: 127.1296, name: '구리시' },
  '안성': { lat: 37.0080, lon: 127.2797, name: '안성시' },
  '포천': { lat: 37.8949, lon: 127.2003, name: '포천시' },
  '의왕': { lat: 37.3447, lon: 126.9682, name: '의왕시' },
  '양평': { lat: 37.4917, lon: 127.4876, name: '양평군' },
  '여주': { lat: 37.2982, lon: 127.6370, name: '여주시' },
  '가평': { lat: 37.8315, lon: 127.5095, name: '가평군' },
  '연천': { lat: 38.0964, lon: 127.0747, name: '연천군' },

  // --- 강원특별자치도 ---
  '춘천': { lat: 37.8813, lon: 127.7298, name: '춘천시' },
  '원주': { lat: 37.3422, lon: 127.9202, name: '원주시' },
  '강릉': { lat: 37.7519, lon: 128.8761, name: '강릉시' },
  '속초': { lat: 38.2070, lon: 128.5918, name: '속초시' },
  '동해': { lat: 37.5247, lon: 129.1143, name: '동해시' },
  '태백': { lat: 37.1652, lon: 128.9856, name: '태백시' },
  '삼척': { lat: 37.4498, lon: 129.1653, name: '삼척시' },
  '홍천': { lat: 37.6972, lon: 127.8887, name: '홍천군' },
  '횡성': { lat: 37.4918, lon: 127.9850, name: '횡성군' },
  '평창': { lat: 37.3705, lon: 128.3902, name: '평창군' },
  '정선': { lat: 37.3806, lon: 128.6608, name: '정선군' },
  '철원': { lat: 38.1468, lon: 127.3134, name: '철원군' },
  '양구': { lat: 38.1068, lon: 127.9892, name: '양구군' },
  '인제': { lat: 38.0697, lon: 128.1704, name: '인제군' },
  '고성': { lat: 38.3806, lon: 128.4678, name: '강원 고성군' },
  '양양': { lat: 38.0754, lon: 128.6189, name: '양양군' },

  // --- 충청북도 ---
  '청주': { lat: 36.6424, lon: 127.4890, name: '청주시' },
  '충주': { lat: 36.9910, lon: 127.9259, name: '충주시' },
  '제천': { lat: 37.1326, lon: 128.1910, name: '제천시' },
  '음성': { lat: 36.9337, lon: 127.6905, name: '음성군' },
  '진천': { lat: 36.8553, lon: 127.4355, name: '진천군' },
  '옥천': { lat: 36.3010, lon: 127.5707, name: '옥천군' },
  '영동': { lat: 36.1749, lon: 127.7760, name: '영동군' },
  '괴산': { lat: 36.8153, lon: 127.7868, name: '괴산군' },
  '단양': { lat: 36.9845, lon: 128.3655, name: '단양군' },

  // --- 충청남도 ---
  '천안': { lat: 36.8151, lon: 127.1139, name: '천안시' },
  '아산': { lat: 36.7898, lon: 127.0018, name: '아산시' },
  '서산': { lat: 36.7845, lon: 126.4503, name: '서산시' },
  '당진': { lat: 36.8897, lon: 126.6459, name: '당진시' },
  '공주': { lat: 36.4556, lon: 127.1248, name: '공주시' },
  '보령': { lat: 36.3333, lon: 126.6129, name: '보령시' },
  '논산': { lat: 36.1872, lon: 127.0987, name: '논산시' },
  '홍성': { lat: 36.6009, lon: 126.6648, name: '홍성군' },
  '예산': { lat: 36.6800, lon: 126.8458, name: '예산군' },
  '태안': { lat: 36.7538, lon: 126.2981, name: '태안군' },
  '부여': { lat: 36.2756, lon: 126.9098, name: '부여군' },
  '서천': { lat: 36.0805, lon: 126.6918, name: '서천군' },

  // --- 전북특별자치도 ---
  '전주': { lat: 35.8242, lon: 127.1480, name: '전주시' },
  '익산': { lat: 35.9483, lon: 126.9578, name: '익산시' },
  '군산': { lat: 35.9676, lon: 126.7369, name: '군산시' },
  '정읍': { lat: 35.5699, lon: 126.8577, name: '정읍시' },
  '남원': { lat: 35.4164, lon: 127.3904, name: '남원시' },
  '김제': { lat: 35.8036, lon: 126.8808, name: '김제시' },
  '완주': { lat: 35.9046, lon: 127.1648, name: '완주군' },
  '부안': { lat: 35.7317, lon: 126.7332, name: '부안군' },
  '고창': { lat: 35.4358, lon: 126.7020, name: '고창군' },
  '무주': { lat: 35.9861, lon: 127.6610, name: '무주군' },

  // --- 전라남도 ---
  '여수': { lat: 34.7604, lon: 127.6622, name: '여수시' },
  '순천': { lat: 34.9506, lon: 127.4872, name: '순천시' },
  '목포': { lat: 34.8118, lon: 126.3922, name: '목포시' },
  '나주': { lat: 35.0161, lon: 126.7108, name: '나주시' },
  '광양': { lat: 34.9407, lon: 127.6959, name: '광양시' },
  '무안': { lat: 34.9904, lon: 126.4817, name: '무안군' },
  '해남': { lat: 34.5734, lon: 126.5989, name: '해남군' },
  '고흥': { lat: 34.6111, lon: 127.2831, name: '고흥군' },
  '화순': { lat: 35.0645, lon: 126.9868, name: '화순군' },
  '영암': { lat: 34.8001, lon: 126.6968, name: '영암군' },
  '영광': { lat: 35.2774, lon: 126.5120, name: '영광군' },
  '완도': { lat: 34.3110, lon: 126.7550, name: '완도군' },
  '진도': { lat: 34.4868, lon: 126.2634, name: '진도군' },
  '신안': { lat: 34.8336, lon: 126.1023, name: '신안군' },

  // --- 경상북도 ---
  '포항': { lat: 36.0190, lon: 129.3435, name: '포항시' },
  '구미': { lat: 36.1195, lon: 128.3446, name: '구미시' },
  '경주': { lat: 35.8562, lon: 129.2247, name: '경주시' },
  '경산': { lat: 35.8251, lon: 128.7414, name: '경산시' },
  '안동': { lat: 36.5684, lon: 128.7294, name: '안동시' },
  '김천': { lat: 36.1399, lon: 128.1136, name: '김천시' },
  '칠곡': { lat: 35.9956, lon: 128.4016, name: '칠곡군' },
  '영주': { lat: 36.8057, lon: 128.6241, name: '영주시' },
  '상주': { lat: 36.4159, lon: 128.1591, name: '상주시' },
  '영천': { lat: 35.9733, lon: 128.9385, name: '영천시' },
  '울진': { lat: 36.9931, lon: 129.4005, name: '울진군' },
  '울릉도': { lat: 37.4846, lon: 130.9055, name: '울릉군' },
  '독도': { lat: 37.2429, lon: 131.8682, name: '독도' },

  // --- 경상남도 ---
  '창원': { lat: 35.2280, lon: 128.6811, name: '창원시' },
  '마산': { lat: 35.2100, lon: 128.5700, name: '창원시 마산' },
  '진해': { lat: 35.1485, lon: 128.6650, name: '창원시 진해' },
  '김해': { lat: 35.2285, lon: 128.8894, name: '김해시' },
  '진주': { lat: 35.1802, lon: 128.1076, name: '진주시' },
  '양산': { lat: 35.3350, lon: 129.0374, name: '양산시' },
  '거제': { lat: 34.8806, lon: 128.6211, name: '거제시' },
  '통영': { lat: 34.8544, lon: 128.4332, name: '통영시' },
  '사천': { lat: 35.0038, lon: 128.0642, name: '사천시' },
  '밀양': { lat: 35.5038, lon: 128.7466, name: '밀양시' },
  '함안': { lat: 35.2725, lon: 128.4065, name: '함안군' },
  '창녕': { lat: 35.5446, lon: 128.4922, name: '창녕군' },
  '남해': { lat: 34.8377, lon: 127.8924, name: '남해군' },
  '하동': { lat: 35.0672, lon: 127.7513, name: '하동군' },
  '거창': { lat: 35.6866, lon: 127.9095, name: '거창군' },

  // --- 제주특별자치도 ---
  '제주': { lat: 33.4996, lon: 126.5312, name: '제주시' },
  '서귀포': { lat: 33.2541, lon: 126.5601, name: '서귀포시' }
};

// WMO 날씨 코드 변환 함수
function getWeatherDescription(code) {
  const weatherCodes = {
    0: '맑음 ☀️', 1: '대체로 맑음 🌤️', 2: '구름 조금 ⛅', 3: '흐림 ☁️',
    45: '안개 🌫️', 48: '짙은 안개 🌫️', 51: '이슬비 🌧️', 53: '이슬비 🌧️',
    61: '약한 비 🌧️', 63: '비 🌧️', 65: '강한 비 🌧️', 71: '약한 눈 ❄️',
    73: '눈 ❄️', 75: '강한 눈 ❄️', 80: '소나기 🌦️', 95: '뇌우 🌩️'
  };
  return weatherCodes[code] || '알 수 없음';
}

// 미세먼지 수치 판정 함수
function getAirQualityStatus(pm10) {
  if (pm10 <= 30) return { status: '좋음 😀', color: '#10B981' };
  if (pm10 <= 80) return { status: '보통 🙂', color: '#3B82F6' };
  if (pm10 <= 150) return { status: '나쁨 😷', color: '#F59E0B' };
  return { status: '매우 나쁨 🚨', color: '#EF4444' };
}

/**
 * 📍 카카오 지도 생성 및 좌표 이동
 */
function initOrUpdateKakaoMap(lat, lon, cityName) {
  if (typeof kakao === 'undefined' || !kakao.maps) {
    console.warn('카카오 지도 SDK가 아직 로드되지 않았습니다.');
    return;
  }

  const moveLatLon = new kakao.maps.LatLng(lat, lon);

  if (!map) {
    const container = document.getElementById('map');
    const options = {
      center: moveLatLon,
      level: 8
    };
    map = new kakao.maps.Map(container, options);
    marker = new kakao.maps.Marker({ position: moveLatLon });
    marker.setMap(map);
  } else {
    map.setCenter(moveLatLon);
    marker.setPosition(moveLatLon);
  }
}

/**
 * 위치 좌표 검색 (매핑 테이블 ➔ 없을 시 Open-Meteo Geocoding)
 */
async function getCoordinates(cityName) {
  const cleanName = cityName.trim().toLowerCase();

  if (KOREA_CITIES[cleanName]) {
    return KOREA_CITIES[cleanName];
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=ko`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const krResult = data.results.find(res => res.country_code === 'KR') || data.results[0];
      return {
        lat: krResult.latitude,
        lon: krResult.longitude,
        name: krResult.name
      };
    }
    return null;
  } catch (err) {
    console.error('위치 탐색 오류:', err);
    return null;
  }
}

/**
 * 날씨 & 공기질 API 호출
 */
async function fetchWeatherData(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FSeoul`;
  const response = await fetch(url);
  return await response.json();
}

async function fetchAirQualityData(lat, lon) {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,us_aqi&timezone=Asia%2FSeoul`;
  const response = await fetch(url);
  return await response.json();
}

/**
 * 메인 검색 처리 함수
 */
async function searchCityWeather(cityName) {
  if (!cityName || cityName.trim() === '') {
    alert('검색할 도시 이름을 입력하세요.');
    return;
  }

  try {
    const location = await getCoordinates(cityName);
    if (!location) {
      alert(`'${cityName}'에 대한 국내 위치 정보를 찾지 못했습니다.`);
      return;
    }

    const [weatherRes, airRes] = await Promise.all([
      fetchWeatherData(location.lat, location.lon),
      fetchAirQualityData(location.lat, location.lon)
    ]);

    const currentWeather = weatherRes.current;
    const currentAir = airRes.current;
    const airStatus = getAirQualityStatus(currentAir.pm10);

    const result = {
      cityName: location.name,
      lat: location.lat,
      lon: location.lon,
      temp: currentWeather.temperature_2m,
      feelsLike: currentWeather.apparent_temperature,
      humidity: currentWeather.relative_humidity_2m,
      windSpeed: currentWeather.wind_speed_10m,
      weatherText: getWeatherDescription(currentWeather.weather_code),
      pm10: currentAir.pm10,
      pm25: currentAir.pm2_5,
      airText: airStatus.status,
      airColor: airStatus.color
    };

    // 1. UI 텍스트 출력
    renderUI(result);

    // 2. 📍 카카오 지도 업데이트
    initOrUpdateKakaoMap(result.lat, result.lon, result.cityName);

  } catch (err) {
    console.error('오류 발생:', err);
    alert('데이터 전송 실패. 콘솔을 확인해 주세요.');
  }
}

function renderUI(data) {
  const cityElem = document.getElementById('city-name');
  const tempElem = document.getElementById('temperature');
  const weatherElem = document.getElementById('weather-status');
  const humidityElem = document.getElementById('humidity');
  const pm10Elem = document.getElementById('pm10');
  const pm25Elem = document.getElementById('pm25');
  const airStatusElem = document.getElementById('air-status');

  if (cityElem) cityElem.innerText = data.cityName;
  if (tempElem) tempElem.innerText = `${data.temp}°C (체감 ${data.feelsLike}°C)`;
  if (weatherElem) weatherElem.innerText = data.weatherText;
  if (humidityElem) humidityElem.innerText = `습도: ${data.humidity}% | 풍속: ${data.windSpeed}km/h`;

  if (pm10Elem) pm10Elem.innerText = `${data.pm10} µg/m³`;
  if (pm25Elem) pm25Elem.innerText = `${data.pm25} µg/m³`;

  if (airStatusElem) {
    airStatusElem.innerText = `대기 상태: ${data.airText}`;
    airStatusElem.style.color = data.airColor;
  }
}

// --------------------------------------------------
// 초기화 및 이벤트 리스너 (kakao.maps.load 사용)
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      searchCityWeather(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchCityWeather(searchInput.value);
      }
    });
  }

  // kakao 객체 생성을 대기한 후 안전하게 kakao.maps.load 실행
  function initKakaoApp() {
    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        searchCityWeather('서울');
      });
    } else {
      setTimeout(initKakaoApp, 50);
    }
  }

  initKakaoApp();
});