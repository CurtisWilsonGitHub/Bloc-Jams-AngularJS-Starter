(function () {
  function SongPlayer() {
    var SongPlayer = {};

    /**
    *@desc Variable track wheter song is playing
    *@type {boolean}
    */

    var currentSong = null;

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
        currentSong.playing = null;

      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats:['mp3'],
        preload: true
      });

      currentSong = song;

    };

/**
*@function playSong
*@desc Plays currently paused song and set song.playing to true
*@param {objec} song
*/

    var playSong = function (song){
      currentBuzzObject.play();
      song.playing = true;
    }

/**
*@function Songplayer.play
*@desc Checks to see if player is paused. If so, plays song
*@param {object} song
*/
    SongPlayer.play = function(song) {
      if (currentSong !== song){
      setSong(song);
      playSong(song);
    }else if (currentSong === song){
      if (currentBuzzObject.isPaused()){
        currentBuzzObject.play();
      }
    }
  };

/**
*@function SongPlayer.pause
*@desc pauses song and sets song.playing to false
*@param song
*/

  SongPlayer.pause = function(song) {
    currentBuzzObject.pause();
    song.playing = false;
  };

    return SongPlayer;
  }





  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);

})();
