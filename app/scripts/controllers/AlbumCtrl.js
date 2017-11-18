( function() {
  function AlbumCtrl(Fixtures){
    this.albumData = Fixtures.getAlbum(); ;
    console.log(this.albumData['songs'][0]['title']);
  }

    angular
      .module('blocJams')
      .controller('AlbumCtrl', ['Fixtures', AlbumCtrl])
})();
