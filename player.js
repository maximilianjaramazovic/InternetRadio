/* HTML Elements */
const audio_ = document.querySelector('#stream')
const play_pause_button_ = document.querySelector('[name="play-pause"]')
//const play_pause_button_icon_ = play_pause_button_.querySelector('i.fas')
const volume_control_ = document.querySelector('[name="volume"]')
const currently_playing_ = document.querySelector('.currently-playing-title')
const volume_button_ = document.querySelector('[name="mute"]')
//const volume_button_icon_ = volume_button_.querySelector('i.fas')

let is_playing = false
let fetch_interval = null
let current_volume = 0.2

audio_.volume = current_volume

/**
 * Fetches the currently playing
 * @returns {Promise<any>}
 */
const fetchCurrentlyPlaying = () => fetch("D:\Files\Audio\Music\The Deli - 532PM.mp3")
.then(response => response.json())
.then(data =>currently_playing_.innerText = data.currentSong)

//missing icon update function
/**
 * @todo figure out the <i> to work in html
 */

volume_control_.addEventListener('input', () => {
  const volume = parseFloat(volume_control_.value)

  audio_.volume = current_volume = volume
  current_volume = volume

  //adjustVolumeIcon(volume)
})

volume_button_.addEventListener('click', () => {
  if (audio_.volume > 0){
  //adjustVolumeIcon(0)
  audio_.volume = 0
  volume_control_.value = 0
  } else {
  //adjustVolumeIcon(currentVolume)
  audio_.volume = current_volume
  volume_control_.value = current_volume
  }
})

play_pause_button_.addEventListener('click', () => {
  if (is_playing)
  {
    audio_.pause()

    //playPauseButtonIcon.classList.remove('fa-pause')
    //playPauseButtonIcon.classList.add('fa-play')

    clearInterval(fetch_interval)
    currently_playing_.innerText = 'Listen to Some Radio Station'
  } else {
    audio_.play()

    //playPauseButtonIcon.classList.remove('fa-play')
    //playPauseButtonIcon.classList.add('fa-pause')

    fetchCurrentlyPlaying()
    fetch_interval = setInterval(fetchCurrentlyPlaying, 3000)
  }
  is_playing = !is_playing
})