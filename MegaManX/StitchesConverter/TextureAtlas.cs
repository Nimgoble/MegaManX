using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace StitchesConverter
{
    [Serializable]
    public class TextureAtlas
    {
        public TextureAtlas()
        {
            SubTextures = new List<SubTexture>();
        }

        public string ImagePath { get; set; }

        [XmlElement("SubTexture")]
        public List<SubTexture> SubTextures { get; set; }
    }
}
