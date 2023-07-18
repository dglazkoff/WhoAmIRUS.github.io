export const concatClassNames = (...classNames: (string | undefined)[]) => {
    return classNames.filter(Boolean).join(' ');
}