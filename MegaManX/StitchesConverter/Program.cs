using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;
using System.Xml.Serialization;

namespace StitchesConverter
{
    /// <summary>
    /// Parses a css file from http://draeton.github.io/stitches/ and converts it to a TextureAtlas
    /// </summary>
    class Program
    {
        static string regex = @"\bsprite-\b(?<name>\w+)\s*\{\s*\bwidth\b[:]\s*(?<width>[0-9]+)px;\s*\bheight\b[:]\s*(?<height>[0-9]+)px;\s*\bbackground-position\b[:]\s*[-]*(?<x>[0-9]+)px\s*[-]*(?<y>[0-9]+)px;\s*}";
        /// <summary>
        /// Needs two arguments: input file and output file.
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            string input = args[0];
            string output = args.Length > 1 ? args[1] : string.Empty;

            if (string.IsNullOrEmpty(output))
                return;

            var lines = File.ReadAllLines(input);
            var combined = string.Join(String.Empty, lines.Where(x => !String.IsNullOrEmpty(x.Trim())));

            var matches = Regex.Matches(combined, regex);
            var atlas = new TextureAtlas();
            foreach (Match match in matches)
            {
                if (!match.Success)
                    continue;
                atlas.SubTextures.Add(ConvertMatchToSubTexture(match));
            }

            XmlSerializer serializer = new XmlSerializer(typeof(TextureAtlas));
            TextWriter writer = new StreamWriter(output);
            serializer.Serialize(writer, atlas);
            writer.Close();
        }

        static SubTexture ConvertMatchToSubTexture(Match match)
        {
            return new SubTexture()
            {
				Name = match.Groups["name"].Value,
                Height = match.Groups["height"].Value,
                Width = match.Groups["width"].Value,
                X = match.Groups["x"].Value,
                Y = match.Groups["y"].Value
            };
        }
    }
}
