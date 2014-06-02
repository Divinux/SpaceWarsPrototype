Shader "Example/Diffuse Texture" {
	Properties {
		
		
		_MainTex ("Texture", 2D) = "white" {}
		_Threshold("Threshold",Range(-1,1))=0

	}
	SubShader {
		Tags { "RenderType" = "Opaque" }
		CGPROGRAM
		#pragma surface surf SimpleLambert
		half _Threshold;
		half4 LightingSimpleLambert (SurfaceOutput s, half3 lightDir, half atten) {
			half NdotL = dot (s.Normal, lightDir);
			
			

			half4 c;
			

			c.rgb = s.Albedo * _LightColor0.rgb * (atten * 2);
			if(NdotL<0.2)
			c.rgb*=0;
			else if(NdotL<0.4)
			c.rgb*=0.3;
			else if(NdotL<0.6)
			c.rgb*=0.5;



			c.a = s.Alpha;
			if(NdotL<_Threshold)
			clip(-1);
			return c;
		}

		struct Input {
			float2 uv_MainTex;
		};
		sampler2D _MainTex;
		void surf (Input IN, inout SurfaceOutput o) {
			o.Albedo = tex2D (_MainTex, IN.uv_MainTex).rgb;
		}
		ENDCG
	}
	Fallback "Diffuse"
}