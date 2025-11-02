export default function Skills({ item }) {
  const skills = JSON.parse(import.meta.env.VITE_MY_SKILLS);

  function normalizeForWordSearch(str) {
    // add a space at start/end, replace punctuation with space, collapse multiple spaces
    return (" " + str + " ")
      .replace(/[.*+?^${}()|[\]\\]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getSkillsInDescription(text) {
    const textSpaced = normalizeForWordSearch(text);
    return skills.filter((skill) => {
      const re = new RegExp(" " + skill + " ", "i");
      return re.test(textSpaced);
    });
  }

  const skillsInDescription = getSkillsInDescription(item.descriptionText);

  return (
    <div className="flex gap-2">
      <span className="text-sm font-medium mr-2">
        Skills Match ({skillsInDescription.length}/{skills.length}):
      </span>
      {skillsInDescription.map((skill) => (
        <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded">
          {skill}
        </span>
      ))}
    </div>
  );
}
