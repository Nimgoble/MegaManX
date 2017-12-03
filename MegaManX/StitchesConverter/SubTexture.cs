using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace StitchesConverter
{
    [Serializable]
    public class SubTexture
    {
        [XmlAttribute("name")]
        public string Name { get; set; }
        [XmlAttribute("x")]
        public string X { get; set; }
        [XmlAttribute("y")]
        public string Y { get; set; }
        [XmlAttribute("width")]
        public string Width { get; set; }
        [XmlAttribute("height")]
        public string Height { get; set; }
    }
}
