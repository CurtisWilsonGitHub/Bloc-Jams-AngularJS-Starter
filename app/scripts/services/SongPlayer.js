(function () {
  function SongPlayer($rootScope,Fixtures) {
    var SongPlayer = {};

    /**
    * @desc object of current album
    * @type {object}
    */

    var currentAlbum = Fixtures.getAlbum();

/**
*@function getSongindex
*@desc gets index number of currently playing song from AlbumCtrl
*@param {object} song
*/
    var getSongIndex = function(song){
      return currentAlbum.songs.indexOf(song);
    };

/**
* @desc Buzz object audio file
* @type {object}
*/

    var currentBuzzObject = null;

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {object} song
*/

    var setSong = function (song) {
      if (currentBuzzObject){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;

      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats:['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;

    currentBuzzObject.bind('timeupdate',function(){
        $rootScope.$apply(function(){
            SongPlayer.currentTime = currentBuzzObject.getTime();
        });
    })

    };

/**
*@function playSong
*@desc Plays currently paused song and set song.playing to true
*@param {object} song
*/

    var playSong = function (song){
      currentBuzzObject.play();
      song.playing = true;
    }

  /**
  *@function stopSong
  *@desc stops playback and set property of song object to null
  *@param {object} song
  */

   var stopSong = function(song){
    currentBuzzObject.stop();
    song.playing = false;
   }

  /**
  *@desc Variable track wheter song is playing
  *@type {boolean}
  */

  SongPlayer.currentSong = null;

  /**
  *@desc Varibale tracks the voume setting
  *@type{number}
  */

  SongPlayer.volume = null;

/**
*@desc Current playback time (in seconds) of currently playing song
*@type {number}
*/

   SongPlayer.currentTime = null;

/**
*@function setCurrentTime
*@desc set current time (in seconds) of currently playing song
*@param {Number} time
*/

    SongPlayer.setCurrentTime = function (time)  {
        if (currentBuzzObject){
            currentBuzzObject.setTime(time);

        }
    };

/**
*@function SongPlayer.play
*@desc Checks to see if player is paused. If so, plays song
*@param {object} song
*/
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song){
        setSong(song);
        playSong(song);
    }else if (SongPlayer.currentSong === song){
      if (currentBuzzObject === null){
        return;
      }else if (currentBuzzObject.isPaused()){
        playSong(song);;
      }
    }
  };

/**
*@function SongPlayer.pause
*@desc pauses song and sets song.playing to false
*@param song
*/

  SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
  };

/**
*@function SongPlayer.previous
*@desc Selects the previous song in album. If there's no previous song, it'll stop playback
*@param none
*/

    SongPlayer.previous = function(){
      song = SongPlayer.currentSong;
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

     if (currentSongIndex < 0){
       if(SongPlayer.currentSong){
         currentSongIndex++;
         stopSong(song);
       }

     }else{
       var song = currentAlbum.songs[currentSongIndex];
       setSong(song);
       playSong(song);
     }
    };

/**
*@function SongPlayer.next
*@desc Selects the next album in album and palys it. If there is no next song, it'll stop playback.
*@param none
*/

    SongPlayer.next = function(){
      song = SongPlayer.currentSong;
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if( currentAlbum.songs[currentSongIndex] ){
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }else {
        stopSong(song);
      }

    };

/**
*@function setVolume
*@desc set volume from input on volume seek seekBar
*@param {number} volume
*/
    SongPlayer.setVolume = function(volume){
      currentBuzzObject.setVolume(volume);
    };

return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', ['$rootScope','Fixtures', SongPlayer]);

})();
