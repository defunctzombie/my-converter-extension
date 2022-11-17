export type RegisterMessageConverterArgs<Src = unknown, Dest = unknown> = {
  fromSchemaName: string;
  toSchemaName: string;
  converter: (msg: Src) => Dest;
};

type ExtensionContextExtra = {
  registerMessageConverter<Src = unknown, Dest = unknown>(
    args: RegisterMessageConverterArgs<Src, Dest>,
  ): void;
};

export function activate(extensionContext: ExtensionContextExtra): void {
  extensionContext.registerMessageConverter({
    fromSchemaName: "MyGps",
    toSchemaName: "foxglove.LocationFix",
    converter: (msg: { lat: number; lon: number }) => {
      return {
        latitude: msg.lat,
        longitude: msg.lon,
      };
    },
  });
}
