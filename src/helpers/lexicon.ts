/**
 * Helpers for lexicon
 */
 const lexiconHelper = {
  /**
   * Pluralize
   */
   pluralize: (count: number, variants: string[]): string => {
    let index = 2;
    index = (count == 1) ? 0 : index;
    index = ([2,3,4].includes(count)) ? 1 : index;
    return variants[index] || '';
  }
}

export default lexiconHelper;
