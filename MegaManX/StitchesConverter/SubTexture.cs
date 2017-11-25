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
        [XmlAttribute]
        public string Name { get; set; }
        [XmlAttribute]
        public string X { get; set; }
        [XmlAttribute]
        public string Y { get; set; }
        [XmlAttribute]
        public string Width { get; set; }
        [XmlAttribute]
        public string Height { get; set; }
    }
}
