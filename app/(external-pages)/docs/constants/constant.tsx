import { Code2, Cog, Layers, Rocket } from "lucide-react";

export const navigation = [
  { id: "quickstart", label: "Quick Start", icon: Rocket },
  { id: "integration", label: "Integration", icon: Code2 },
  { id: "api", label: "API Reference", icon: Cog },
  { id: "examples", label: "Examples", icon: Layers },
];

export const scriptTagCode = `<script src="https://embeddable-tour-platform.vercel.app/onboard.iife.js"></script>                    
<script>
  const widget = window.initOnboard({
    tourId: 'demo-tour2',
    resume: true,
    onEvent: (e) => console.log('analytic', e)
    //you can add a styles prop as well for styling
    // styles: {
      // tooltip: { ...},
      // button: { ...},
      // controls: { ...},
      // progress: { ...},
    // },
  });
  document.getElementById('btn').addEventListener('click', () => widget.start());
</script>`;

export const htmlExampleCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Widget Test</title>
</head>

<body>
  <h1 id="logo">My Test Site</h1>
  <div class="card" id="card">
    <h1 className="logo" id="logo">Onboarding Widget Preview</h1>
    <button class=".read-the-docs" id="btn">
      Demo Button
    </button>
    <p id="text-p">
      This screen exists ONLY for local development.
      The real widget is embedded externally.  
    </p>
  </div>
  <script src="https://embeddable-tour-platform.vercel.app/onboard.iife.js"></script>
  <script>
    const widget = window.initOnboard({
      tourId: 'demo-tour2',
      resume: true,
      onEvent: (e) => console.log('analytic', e)
      //you can add a styles prop as well for styling
      // styles: {
        // tooltip: { ...},
        // button: { ...},
      // },
    });
     document.getElementById('btn').addEventListener('click', () => widget.start());
  </script>
</body>
</html>`;
  
export const reactExampleCode = `import { useEffect } from "react";
import { initOnboard } from "embeddable-tour-platform";


function App() {

  useEffect(() => {
    widget?.start();
  }, []);

    const widget = initOnboard({ 
      tourId: 'your tour id', 
      secret_key: "your secret key",
      resume: true,
      styles: {
        tooltip: {... },
      button: {...},
      },
      onEvent: console.log
    });


  return (
    <div style={{ padding: 40 }}>
      <h1 id="logo">Onboarding Widget Preview</h1>

      <button 
        id="btn" 
        style={{ padding: "10px 20px", marginTop: 20 }}
      >
        Demo Button
      </button>

      <p style={{ marginTop: 20 }}>
        This screen exists ONLY for local development.  
        The real widget is embedded externally.
      </p>
    </div>
  );
}

export default App;`
