export const addStitchesEvenly = (current_masks: number, added_amount: number) => {
	
	const average_distance = (current_masks + added_amount) / added_amount;
	const find_gcd = (a: number, b: number): number => {
		return b ? find_gcd(b, a % b) : a;
	};

	const isOdd = (a: number) => a % 2 === 1;

	if (Number.isInteger(average_distance)) {
		return [average_distance];
	}

	const long_distance = Math.ceil(average_distance);
	const short_distance = long_distance - 1;

	let num_long_mask = (current_masks + added_amount) % added_amount;
	let num_short_mask = added_amount - num_long_mask;

	const gcd = find_gcd(num_long_mask, num_short_mask);

	num_long_mask = num_long_mask / gcd;
	num_short_mask = num_short_mask / gcd;

	const middle = [];
	if (isOdd(num_long_mask)) {
		num_long_mask--;
		middle.push(long_distance);
	}
	if (isOdd(num_short_mask)) {
		num_short_mask--;
		middle.push(short_distance);
	}

	const shortest_period = num_long_mask + num_short_mask;

	if (shortest_period == 0) {
		return middle;
	}

	const simplest_period = [...Array(shortest_period / 2 + 1).keys()]
		.slice(1)
		.map((num) => {
			const least_common =
				num_long_mask > num_short_mask
					? [short_distance, num_short_mask]
					: [long_distance, num_long_mask];
			const most_common =
				least_common[0] === short_distance
					? [long_distance, num_long_mask]
					: [short_distance, num_short_mask];
			if (!isOdd(num) && least_common[1] >= num) {
				return least_common[0];
			}
			return most_common[0];
		});
	return [...simplest_period, ...middle, ...simplest_period.toReversed()];
};
