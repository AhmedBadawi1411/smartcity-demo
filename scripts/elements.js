
const topToolBar = document.getElementsByClassName('right')[0];
const bottomToolBar = document.getElementsByClassName('bottom-bar')[0];

const baselayerIcon = document.createElement('i');
baselayerIcon.className='fa-regular fa-map';

const cesiumBaseLayerSelected = document.getElementsByClassName('cesium-baseLayerPicker-selected')[0];
cesiumBaseLayerSelected.style.width='0';

const baselayer = document.getElementsByClassName('cesium-toolbar-button')[0];
baselayer.classList.add('custom-button');

baselayer.append(baselayerIcon);
topToolBar.appendChild(baselayer);

const fullScreenBtn = document.getElementsByClassName('cesium-fullscreenButton')[0];
bottomToolBar.appendChild(fullScreenBtn);

let isFullScreen = false;
const fullScreenIcon = document.createElement('i');
fullScreenIcon.className = 'fa-solid fa-expand';
fullScreenBtn.addEventListener('click',()=>{
    if(isFullScreen){
        fullScreenIcon.className = 'fa-solid fa-expand'
        fullScreenBtn.classList.remove('activeBtn');
    }else{
        fullScreenIcon.className = 'fa-solid fa-compress';
        fullScreenBtn.classList.add('activeBtn');
    }
    isFullScreen = !isFullScreen
});

fullScreenBtn.appendChild(fullScreenIcon);

const dayDate = document.getElementsByTagName('tspan')[0];
const dayTime = document.getElementsByTagName('tspan')[1];
const daySpeed = document.getElementsByTagName('tspan')[2];
const day = document.getElementsByTagName('g');

const seachIcon = document.createElement('i');
seachIcon.className = 'fa-solid fa-magnifying-glass-location'
const topRightToolbar = document.getElementsByClassName('right')[0];
const searchContainer = document.getElementsByClassName('cesium-viewer-geocoderContainer')[0];
document.getElementsByClassName('cesium-geocoder-searchButton')[0].appendChild(seachIcon);
topRightToolbar.appendChild(searchContainer);

