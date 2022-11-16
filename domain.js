export const betrayalSplot = Object.assign(
    {},
    {
      states: ["traitor", "enabler", "victim", "bystander", "helper"],
      rule: (db) => {
        let they = (vs) => vs.map((v) => db.node(v).state);
        return [
          (u, vs, links) =>
            !they(vs).every((s) => s == "traitor") &&
            they(vs).some((s) => s == "victim"),
          (u, vs, links) =>
            !they(vs).every((s) => s == "enabler") &&
            they(vs).some((s) => s == "traitor"),
          (u, vs, links) =>
            !they(vs).every((s) => s == "victim") &&
            they(vs).some((s) => s == "traitor"),
          (u, vs, links) => !they(vs).some((s) => s == "bystander"),
          (u, vs, links) =>
            !they(vs).every((s) => s == "helper") &&
            they(vs).some((s) => s == "victim")
        ];
      },
      eventsMatrix: {
        traitor: {
          traitor: "conspired-with",
          enabler: "abetted-by",
          victim: "betrayed-them"
        },
        enabler: {
          traitor: "abetted-them",
          victim: "weakened-them",
          helper: "sided-against"
        },
        victim: {
          traitor: "betrayed-by",
          enabler: "weakened-by",
          helper: "protected-by",
          bystander: "pitied-by"
        },
        bystander: {
          victim: "pitied-them",
          helper: "exhorted-by"
        },
        helper: {
          enabler: "sided-against",
          victim: "protected-them",
          bystander: "exhorted-them"
        }
      }
    }
  )