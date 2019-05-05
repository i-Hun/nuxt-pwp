function sql_to_object(contents) {
	let result = [];
	contents[0].values.forEach((value, i) => {
		let record = {}
		contents[0].columns.forEach((column, i) => record[column] = value[i])
		result.push(record)
	});
	return result;
}

export default sql_to_object;