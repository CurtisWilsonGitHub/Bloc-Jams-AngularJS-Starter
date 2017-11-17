( function() {
  function AlbumCtrl(){
    this.albumData = albumPicasso ;
    console.log(this.albumData['songs'][0]['title']);
  }

    angular
      .module('blocJams')
      .controller('AlbumCtrl',AlbumCtrl)
})();
