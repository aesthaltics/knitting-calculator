import { find_gcd, isOdd } from "./utils";

export const addStitchesEvenly = (
	current_masks: number,
	added_amount: number
) => {
	/**
	 * Calculates the intervals for evenly adding new stitches when knitting
	 *
	 * @param current_masks - The current number of stitches
	 * @param added_amount - The number of stitches to add
	 *
	 * @returns A number[] where each number represents the distance between the new stitches. This is the simplest repeatable period.
	 * @alpha
	 */
	const average_distance = (current_masks + added_amount) / added_amount;
	const num_long_mask = (current_masks + added_amount) % added_amount;
	const num_short_mask = added_amount - num_long_mask;
	return generateEvenPattern(average_distance, num_long_mask, num_short_mask);
};

export const removeStitchesEvenly = (
	current_stiches_amount: number,
	number_of_stitches_to_remove: number
) => {
	const average_distance =
		current_stiches_amount / number_of_stitches_to_remove;
	
	const num_long_dist = current_stiches_amount % number_of_stitches_to_remove
	const num_short_dist = number_of_stitches_to_remove - num_long_dist

	return generateEvenPattern(average_distance, num_long_dist, num_short_dist)
};

const generateEvenPattern = (
	average_distance: number,
	num_long_dist: number,
	num_short_dist: number
) => {
	if (Number.isInteger(average_distance)) {
		return [average_distance];
	}

	const long_distance = Math.ceil(average_distance);
	const short_distance = long_distance - 1;

	const gcd = find_gcd(num_long_dist, num_short_dist);

	num_long_dist = num_long_dist / gcd;
	num_short_dist = num_short_dist / gcd;

	const middle = [];
	if (isOdd(num_long_dist)) {
		num_long_dist--;
		middle.push(long_distance);
	}
	if (isOdd(num_short_dist)) {
		num_short_dist--;
		middle.push(short_distance);
	}

	const shortest_period = num_long_dist + num_short_dist;

	if (shortest_period == 0) {
		return middle;
	}

	const simplest_period = [...Array(shortest_period / 2 + 1).keys()]
		.slice(1)
		.map((num) => {
			const least_common =
				num_long_dist > num_short_dist
					? [short_distance, num_short_dist]
					: [long_distance, num_long_dist];
			const most_common =
				least_common[0] === short_distance
					? [long_distance, num_long_dist]
					: [short_distance, num_short_dist];
			if (!isOdd(num) && least_common[1] >= num) {
				return least_common[0];
			}
			return most_common[0];
		});
	return [...simplest_period, ...middle, ...simplest_period.toReversed()];
};
