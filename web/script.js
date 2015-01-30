var Settings = function() {
  this.Renderer = 'edge';
  this.Slice = 0.5;
  this.Transfer = 'bones';
  this.Selector = 'MAX';
};

var gui;

window.onload = function() {
  var settings = new Settings();
  gui = new dat.GUI();

  var renderer = gui.add(settings, 'Renderer', ['mip', 'slicer', 'opacity']);
  renderer.onChange(function(value) {
    $('#volume_container').append( $('#transform > VolumeData') );
    $('#transform').append( $('#' + value) );

    // intensity_folder.close();
    slicer_folder.close();
    opacity_folder.close();
    if(value != 'mip'){
      eval(value + '_folder').open();
    }
    
    if (value == 'opacity') $('#legend').show();
    else $('#legend').hide();
  });

  // var intensity_folder = gui.addFolder('intensity Options');
  // var intensity_selector = intensity_folder.add(settings, 'Selector', ['MAX', 'AVERAGE']);
  // intensity_selector.onChange(function(value){
  //   $('#intensity > ProjectionVolumeStyle').attr('type', value);
  // });

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
        $('#legend img').attr('src', 'transfer/skin.png');
        break;
      default:
        $('#transfer_function').attr('lightFactor', '1.8');
        $('#transfer_function').attr('opacityFactor', '10.0');
        $('#transfer_function ImageTexture').attr('url', 'transfer/bones.png');
        $('#legend img').attr('src', 'transfer/bones.png');
    }

    document.getElementById('opacity')._x3domNode._dirty.shader = false;
  });
}
