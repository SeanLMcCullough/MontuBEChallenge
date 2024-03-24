/**
 * wait for ms milliseconds before resolving
 * @param ms the number of milliseconds to wait
 * @returns
 */
export async function wait (ms: number): Promise<void> {
  return await new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
