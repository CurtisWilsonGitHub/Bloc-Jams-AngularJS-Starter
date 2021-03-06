(function () {
  function SongPlayer(Fixtures) {
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

   SongPlayer.test = function(){
    return "this is a test";
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

return SongPlayer;
  }

  angular
  .module('blocJams')
  .factory('SongPlayer', ['Fixtures', SongPlayer]);

})();
