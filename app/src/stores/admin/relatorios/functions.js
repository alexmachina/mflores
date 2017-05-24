import config from '../../config.js'

export function toDataUrl(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
}

export const renderFooter = function() {
  return new Promise((resolve, reject) => {
   const footer = [  
        {style: 'footerText',text: 'Telefones: 11 7703-4683/ 11 41592624/ 11 95639 9063 \n'+
          'Rua Professor Valdecir Campestre, 364, Sala 01 \n'+
          'Centro, Vargem Grande Paulista'},
        {alignment: 'center', fontSize:8, text:'www.mfloresimoveis.com.br | creci: 174374'}
   ]

    resolve(footer)
  })
}

export const renderHeader = function() {
  return new Promise((resolve, reject) => {

    toDataUrl(config.url + '/img/tb_logo.png', (base64Img) => {
      const header = [{ 
        image: base64Img,
        width: 150,
        height:75,
        alignment:'left',
        margin: [50, 50, 0, 0]
      }]

      resolve(header)
    })
  })
}


export const styles =
  {
    footerText: {
      alignment:'center',
      color:'#3062b2',
      margin:[0,90,0,0],
      fontSize:8
    },
    header: {
      fontSize:12,
      bold:true,
      alignment: 'center'
    },
    table: {
      marginRight:50,
      marginLeft:50
    },
    tableHeader: {
      alignment:'center',
      bold: true,
      fillColor:'#428bca',
      color:'#fff',
      border:true
    },
    tablePrincipal: {
      margin:[50,15,50,30]
    },
    informacoes: {
      fontSize:14,
      margin:[50,15,0,15]
    },
    subtitulo:
    {
      fontSize:12,
      bold:true,
      margin:5,
      alignment:'center'
    },
    default: {
      alignment: 'center'
    },
    marginTop: {
      marginTop:200
    },
    total: {
      alignment:'right',
      marginRight:50
    }
  }
