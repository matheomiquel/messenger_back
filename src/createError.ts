export  async function createError({ message, status }: { message: string[], status: number }) {
    return {
        message,
        status
    }
}