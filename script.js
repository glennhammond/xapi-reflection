document.getElementById("modeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark");
});

async function sendXAPI() {
  const activity = document.getElementById("activity").value;
  const reflection = document.getElementById("reflection").value;

  const statement = {
    actor: { name: "Glenn Hammond", mbox: "mailto:glenn@glennhammond.com" },
    verb: {
      id: "http://adlnet.gov/expapi/verbs/experienced",
      display: { "en-US": "experienced" }
    },
    object: {
      id: `http://example.com/activity/${activity}`,
      definition: {
        name: { "en-US": `Activity: ${activity}` },
        description: {
          "en-US": `Reflection: ${reflection}`
        }
      }
    }
  };

  try {
    const response = await fetch("https://lrs2.isq.qld.edu.au/glenn-testing/xapi/statements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic dmFwZGFmOm93YWZvZA=="
      },
      body: JSON.stringify(statement)
    });

    const result = await response.text();
    document.getElementById("result").innerText = `xAPI statement sent:\n${result}`;
  } catch (err) {
    document.getElementById("result").innerText = "Error sending statement: " + err.message;
  }
}
