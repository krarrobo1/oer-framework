export const convertToBuffer = async (reader, setManual) => {
    return await Buffer.from(reader.result);
}