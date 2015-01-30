var Settings = function() {
  this.Renderer = 'edge';
  this.Slice = 0.5;
  this.Transfer = 'bones';
  this.Threshold = 0.0;
};

var gui;

window.onload = function() {
  var settings = new Settings();
  gui = new dat.GUI();

  var renderer = gui.add(settings, 'Renderer', ['edge', 'slicer', 'opacity']);
  renderer.onChange(function(value) {
    $('#volume_container').append( $('#transform > VolumeData') );
    $('#transform').append( $('#' + value) );

    edge_folder.close();
    slicer_folder.close();
    opacity_folder.close();
    eval(value + '_folder').open();
  });

  var edge_folder = gui.addFolder('Edge Options');
  var edge_threshold = edge_folder.add(settings, 'Threshold', 0.0, 100.0);
  edge_threshold.onChange(function(value){
    $('#edge > EdgeEnhancementVolumeStyle').attr('gradientThreshold', value);
  });

  var slicer_folder = gui.addFolder('Slicer Options');
  var slicer_position = slicer_folder.add(settings, 'Slice', 0.1, 0.78);
  slicer_position.onChange(function(value){
    $('#slicer MPRVolumeStyle').attr('positionLine', value);
  });

  var opacity_folder = gui.addFolder('Opacity Options');
  var opacity_transfer = opacity_folder.add(settings, 'Transfer', ['bones', 'skin']);
  opacity_transfer.onChange(function(value) {
    document.getElementById('opacity')._x3domNode._dirty.shader = true;

    switch (value) {
      case 'skin':
        $('#transfer_function').attr('lightFactor', '1.1');
        $('#transfer_function').attr('opacityFactor', '6.0');
        $('#transfer_function ImageTexture').attr('url', 'transfer/skin.png');
        break;
      default:
        $('#transfer_function').attr('lightFactor', '1.8');
        $('#transfer_function').attr('opacityFactor', '10.0');
        $('#transfer_function ImageTexture').attr('url', 'transfer/bones.png');
    }

    document.getElementById('opacity')._x3domNode._dirty.shader = false;
  });
}
