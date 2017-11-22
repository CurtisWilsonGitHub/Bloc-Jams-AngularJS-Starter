(function () {
  function SongPlayer() {
    var SongPlayer = {};



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
  *@desc Variable track wheter song is playing
  *@type {boolean}
  */

  SongPlayer.currentSong = null;

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
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
  };

    return SongPlayer;
  }





  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);

})();
