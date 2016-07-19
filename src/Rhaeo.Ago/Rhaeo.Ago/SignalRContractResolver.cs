using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Rhaeo.Ago
{
    // https://blogs.msdn.microsoft.com/stuartleeks/2013/11/28/automatic-camel-casing-of-properties-with-signalr-hubs-signalr-v2/
    public sealed class SignalRContractResolver : DefaultContractResolver
    {
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var jsonProperty = base.CreateProperty(member, memberSerialization);
            if (member.DeclaringType?.Namespace?.StartsWith("Rhaeo.Ago.Models") == true)
            {
                jsonProperty.PropertyName = ToCamelCase(jsonProperty.PropertyName);
            }

            return jsonProperty;
        }

        private static string ToCamelCase(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return value;
            }
            var firstChar = value[0];
            if (char.IsLower(firstChar))
            {
                return value;
            }
            firstChar = char.ToLowerInvariant(firstChar);
            return firstChar + value.Substring(1);
        }
    }
}
