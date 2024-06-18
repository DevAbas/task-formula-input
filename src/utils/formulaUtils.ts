export const evaluateFormula = (
  tags: { name: string; value: string | number }[]
): string => {
  const formulaString = tags.map((tag) => tag.value).join(" ");
  try {
    const result = new Function(`return ${formulaString}`)();
    return result.toString();
  } catch (error) {
    console.error("Error evaluating formula:", error);
    return "Invalid formula";
  }
};
