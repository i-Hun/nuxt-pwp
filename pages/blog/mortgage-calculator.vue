<template>
	<div class="blog content">
		<h1 class="title">Лучший ипотечный калькулятор</h1>
<!-- 		<div class="field has-addons">
			<p class="control">
				<button class="button is-black">
					Текстом
				</button>
			</p>
			<p class="control">
				<button class="button">
					Таблицей
				</button>
			</p>
		</div>
 -->
		<div class="columns">
			<div class="column is-three-fifths">
				<div class="columns">
					<div class="column">
						<p>Сейчас на съём квартиры приходится тратить {{formatPrice(monthly_rent)}}, а откладывать удаётся в среднем по {{formatPrice(monthly_save)}} в месяц — так уже удалось накопить {{formatPrice(current_savings)}} Вы подумываете о покупке жилья и хотите понять, как лучше распорядится текущими и будущими средствами. Для этого можно выбрать одну из трёх стратегий:</p>
					</div>
				</div>

				<div class="columns">
					<div class="column">
						<div v-bind:class="{'strategy-summary': true, 'selected-strategy': strategy===1}" v-on:click="selectStrategy(1)">
							Взять ипотеку и постараться как можно быстрее её выплатить.
						</div>
					</div>
					<div class="column">
						<div v-bind:class="{'strategy-summary': true, 'selected-strategy': strategy===2}" v-on:click="selectStrategy(2)">
						Продолжать снимать и копить до тех пор, пока не получится купить свою квартиру сразу.
						</div>
					</div>
					<div class="column">
						<div v-bind:class="{'strategy-summary': true, 'selected-strategy': strategy===3}" v-on:click="selectStrategy(3)">
						Взять ипотеку, но не выплачивать всё сразу, а инвестировать часть средств.
						</div>
					</div>
				</div>

				<div class="columns">
					<div class="column">
						Минимальный срок ипотеки
					</div>
					<div class="column">
						{{formatYears(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent))}}
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p>
							Переплата по процентам
						</p>
						<p>
							(в сегодняшних ценах)
						</p>
					</div>
					<div class="column">
						<p>
							{{formatPrice(getOverPayments(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent)))}}
						</p>
						<p>
							{{formatPrice(getOverPayments(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent), inflationRate))}}
						</p>
					</div>
				</div>

				<div class="columns">
					<div class="column" v-if="strategy===1">
						<p>
							Если внести {{formatPrice(current_savings)}} в качестве первоначального взноса и платить по {{formatPrice(monthly_save + monthly_rent)}} в месяц, то ипотеку на квартиру стоимостью в {{formatPrice(apt_current_price)}} <span v-if="getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save)">удастся выплатить через {{formatYears(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent))}}. Переплата по процентам за это время составит {{formatPrice(getOverPayments(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent)))}} ({{formatPrice(getOverPayments(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent))/getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent)/12)}} в месяц). Впрочем, с учётом инфляции в сегодняшних ценах переплатить придётся только {{formatPrice(getOverPayments(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent), inflationRate))}}</span><span v-else>не получится выплатить, т.к. ежемесячный платёж превышает сумму свободных денег.</span>
						</p>
						<p v-if="getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save)">
							Преимущество такого подхода в том, что не нужно оплачивать съёмное жильё. {{formatYears(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent))}} аренды квартиры за {{formatPrice(monthly_rent)}} стоили бы {{formatPrice(getRentPaymentsInflation(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent)))}} с учётом инфляции ({{formatPrice(getRentPayments(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent)))}} без учёта инфляции) — это значительно превышает переплату по ипотеке.
						</p>
						<p v-if="getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save)">
							С другой стороны, вложение всех средств в ипотеку приведёт к исчезновению финансовой подушки и возможности инвестировать средства. Если вложить уже собранные {{formatPrice(current_savings)}} под {{formatPct(investment_pct)}} годовых, а также ежемесячно добавлять к ним ещё {{formatPrice(monthly_save)}}, то через {{formatYears(getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent))}} получилось бы накопить {{formatPrice(getProfitFromInvestmentsWithRefilling(current_savings, getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent), monthly_save, investment_pct, inflationRate))}} ({{formatPrice(getProfitFromInvestmentsWithRefilling(current_savings, getNumberOfInterestPeriods(apt_current_price - current_savings, mortgage_pct/12, monthly_save + monthly_rent), monthly_save, investment_pct, inflationRate, true))}} в сегодняшних ценах), причём эти средства оставались бы максимально ликвидными всё время.
						</p>
					</div>
					<div class="column" v-if="strategy===2">
						<p>
							Если вы можете инвестировать средства по ставке, значительно превышающей процент по ипотеке, то, возможно, лучше будет воспользоваться этой возможностью. Если не учитывать увеличения стоимости квартиры, то арендуя жильё за {{formatPrice(monthly_rent)}} и откладывая {{formatPrice(monthly_save)}} в месяц под {{formatPct(investment_pct)}} годовых к уже накопленной сумме в {{formatPrice(current_savings)}}, то удастся накопить {{formatPrice(apt_current_price)}} за {{formatYears(getTimeOfSaveMoney4Flat(apt_current_price, current_savings, monthly_save, investment_pct, inflationRate, false))}}, а ежемесячный доход от инвестиций к концу этого срока составит {{formatPrice(apt_current_price * investment_pct / 12)}}
						</p>
						<p>
							Недостаток этой стратегии заключается в том, что за всё время в счёт аренды придётся перечислить {{formatPrice(getRentPaymentsInflation(getTimeOfSaveMoney4Flat(apt_current_price, current_savings, monthly_save, investment_pct, inflationRate, false)))}} с учётом повышения цен согласно общей инфляции.
						</p>
						
						<p class="remark">
							Примечание: при расчёте срока, за который возможно накопить на квартиру я не учитывал ежегодное увеличение стоимости жилья, поскольку получившееся уравнение невозможно решить аналитически, а реализовывать численные методы в JS — удовольствие, к которому я пока не готов, поэтому лучше сразу закладывайте ожидаемую стоимость квартиры через {{formatYears(getTimeOfSaveMoney4Flat(apt_current_price, current_savings, monthly_save, investment_pct, inflationRate, false))}}.
						</p>
					</div>
					<div class="column" v-if="strategy===3">
						<div class="columns">
							<div class="column is-one-fifth">
								<label class="label" for="realtyGrowRate">Рост стоимости квартир в год</label>
							</div>
							<div class="column">
								<div class="current-number">{{formatPct(realtyGrowRate)}}</div>
								<input class="form-control" label="realtyGrowRate" name="realtyGrowRate" type="range" min="0.01" max="0.5" step="0.001" v-model.number="realtyGrowRate">
							</div>
						</div>
						<p>
						To be continued.
						</p>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="initial-params">
					<div>
						<div>
							<label class="label" for="monthly_save">Могу откладывать в месяц</label>
						</div>
						<div>
							<div class="current-number">{{formatPrice(monthly_save)}}</div>
							<input class="form-control" label="monthly_save" name="monthly_save" type="range" min="0" max="300000" step="1000" v-model.number="monthly_save">
						</div>
					</div>

					<div>
						<div>
							<label class="label" for="current_savings">Уже накоплено</label>
						</div>
						<div>
							<div class="current-number">{{formatPrice(current_savings)}}</div>
							<input class="form-control" label="current_savings" name="current_savings" type="range" min="0" max="20000000" step="10000" v-model.number="current_savings">
						</div>
					</div>

					<div>
						<div>
							<label class="label" for="monthly_rent">Стоимость аренды в месяц</label>
						</div>
						<div>
							<div class="current-number">{{formatPrice(monthly_rent)}}</div>
							<input class="form-control" label="monthly_rent" name="monthly_rent" type="range" min="0" max="300000" value="30000" step="500" v-model.number="monthly_rent">
						</div>
					</div>

					<div>
						<div>
							<label class="label" for="apt_current_price">Стоимость квартиры</label>
						</div>
						<div>
							<div class="current-number">{{formatPrice(apt_current_price)}}</div>
							<input class="form-control" label="apt_current_price" name="apt_current_price" type="range" min="1000000" max="50000000" value="10000000" step="10000" v-model.number="apt_current_price">
						</div>
					</div>

					<div>
						<div>
							<label class="label" for="mortgage_pct">Ставка по ипотеке</label>
						</div>
						<div>
							<div class="current-number">{{formatPct(mortgage_pct)}}</div>
							<input class="form-control" label="mortgage_pct" name="mortgage_pct" type="range" min="0.01" max="0.20" step="0.001" v-model.number="mortgage_pct">
						</div>
					</div>

					<div>
						<div>
							<label class="label" for="investment_pct">Прибыль от инвестиций в год</label>
						</div>
						<div>
							<div class="current-number">{{formatPct(investment_pct)}}</div>
							<input class="form-control" label="investment_pct" name="investment_pct" type="range" min="0.01" max="1.0" step="0.001" v-model.number="investment_pct">
						</div>
					</div>
					<div>
						<div>
							<label class="label" for="inflationRate">Инфляция в год</label>
						</div>
						<div>
							<div class="current-number">{{formatPct(inflationRate)}}</div>
							<input class="form-control" label="inflationRate" name="inflationRate" type="range" min="0.0" max="0.2" step="0.001" v-model.number="inflationRate">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import numeral from 'numeral';
	require('numeral/locales/ru');
	numeral.locales["ru"].currency.symbol = "₽";
	numeral.locale('ru');

	const humanizeDuration = require("humanize-duration");

	const random = require('random');
	console.log(random.normal(1000, 1000/5)())

	function getBaseLog(a, b) {
		return Math.log(b) / Math.log(a);
	}

	export default {
		layout: 'wide',
		head () {
			const title = "Лучший ипотечный калькулятор";
			const description = `Расчитывает переплату по ипотеке и показывает стоимость альтернативнх вариантов.`
			return {
				title: title,
				meta: [
					{
						hid: 'description',
						name: 'description',
						content: description
					},
					{
						hid: 'og:title',
						property: 'og:title',
						content: title
					},
					{
						hid: 'og:image',
						property: 'og:image',
						content: '/img/thumbnails/best-mortgage-calculator-thumbnail.jpg'
					},
					{
						hid: 'og:description',
						property: 'og:description',
						content: description
					},
					{ hid: 'author', name: 'author', content: "Олег Нагорный"},
				]
			}
		},
		data() {
			return {
				monthly_save: random.normal(75000, 75000/5)(),
				current_savings: random.normal(3000000, 3000000/5)(),
				monthly_rent: random.normal(40000, 40000/5)(),
				apt_current_price: random.normal(10000000, 10000000/5)(),
				mortgage_pct: 0.072,
				investment_pct: 0.14,
				strategy: 0,
				displyStyle: "fulltext",
				mortgage_years: 3,
				inflationRate: 0.05,
				realtyGrowRate: 0.1,
				account_inflation: false
			}
		},
		methods: {
			formatPrice: function(price) {
				if (price < 1000000) {
					return numeral(price).format('$0 a');
				} else {
					return numeral(price).format('$0.00 a');
				}
			},
			formatPct: function(pct) {
				return numeral(pct).format('0.0%');
			},			
			getNumberOfInterestPeriods: function(loan, interestRate, paymentPerMonth) {
				const a = 1 / (1 + interestRate);
				if ((paymentPerMonth - loan * interestRate) < 0) {
					return NaN
				}
				const b = (paymentPerMonth - loan * interestRate) / paymentPerMonth;
				return getBaseLog(a, b) / 12
			},
			formatYears: function(years) {
				return humanizeDuration(years * 365.25 * 24 * 60 * 60 * 1000, {
					language: "ru",
					largest: 2,
					conjunction: " и ",
					units: ["y", "mo"],
					round: true
				});
			},
			getPaymentPerMonth: function(interestRate, numberOfInterestPeriods, loan) {
				// Ежемесячный платёж
				const paymentPerMonth = (loan * interestRate) / (1 - Math.pow(1 + interestRate, -numberOfInterestPeriods))
				return paymentPerMonth
			},
			getOverPayments: function(years, inflationRate=0) {
				return (years * 12 * (this.monthly_save + this.monthly_rent) - this.apt_current_price + this.current_savings) * Math.pow(1 - inflationRate, years);
			},
			getCompoundInterest: function(initialMoney, interestRate, numberOfInterestPeriods) {
				return initialMoney * Math.pow(1 + interestRate, numberOfInterestPeriods);
			},
			getRentPayments: function(years) {
				return years * 12 * this.monthly_rent;
			},
			getRentPaymentsInflation: function(years) {
				return Math.ceil(years * 12) * this.monthly_rent * Math.pow(1 + this.inflationRate, years);
			},
			getProfitFromInvestmentsWithRefilling: function(
				initialMoney, years, monthlyRefill, investment_pct, inflationRate, account_inflation=false
				) {
				// сколько денег будет через {years} лет, если вложить {initialMoney}
				// под this.investment_pct процентов и ежемесячно вносить {monthlyRefill}
				// https://planetcalc.ru/573/
				const m = 12
				let realInvestmentRate = undefined;
				if (account_inflation) {
					realInvestmentRate = investment_pct - inflationRate
				} else {
					realInvestmentRate = investment_pct
				}
				
				const profitRate = 1 + realInvestmentRate / m
				// Прибыль с первоначального вклада
				const profitFromInitialMoney = initialMoney * Math.pow(profitRate, m * years)
				const profitFromRefill = (monthlyRefill * Math.pow(profitRate, m * years) - monthlyRefill * profitRate) / (realInvestmentRate / m)
				return profitFromInitialMoney + profitFromRefill;
			},
			getTimeOfSaveMoney4Flat: function(
				// https://www.quora.com/What-is-x-if-2-x-2-3x-16
				targetMoney, initialMoney, monthlyRefill, investment_pct, inflationRate, account_inflation=false
				) {
				const m = 12
				let realInvestmentRate = undefined;
				if (account_inflation) {
					realInvestmentRate = investment_pct - inflationRate
				} else {
					realInvestmentRate = investment_pct
				}
				
				const profitRate = 1 + realInvestmentRate / m
				const b = (targetMoney * realInvestmentRate + monthlyRefill * profitRate * m) / (monthlyRefill * m + initialMoney * realInvestmentRate)
				console.log(`targetMoney: ${targetMoney}, initialMoney: ${initialMoney}, monthlyRefill: ${monthlyRefill}`)
				return getBaseLog(profitRate, b) / m
			},
			selectStrategy: function(strategy) {
				this.strategy = strategy;
				setTimeout(function() {
					window.scrollTo(0, document.body.scrollHeight);
				}, 100);
			}
		}

	}
</script>

<style scoped>

.blog {
	font-size: 1.1rem;
}

.remark {
	color: #999;
	font-style: italic;
	font-size: 0.8rem;
}

.strategy-summary {
	cursor: pointer;
	height: 100%;
	border: 1px solid #000;
		border-radius: 3px;
		padding: 10px;
}

.initial-params {
	margin-bottom: 2rem;
	padding-left: 50px;
}

.selected-strategy {
	background-color: #000;
	color: #fff;
}

.current-number {
	text-align: center;
}

input[type=range] {
	width: 100%;
	margin: 13.8px 0;
	background-color: transparent;
	-webkit-appearance: none;
}
input[type=range]:focus {
	outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
	background: #ffffff;
	border: 0.2px solid #010101;
	border-radius: 1.3px;
	width: 100%;
	height: 8.4px;
	cursor: pointer;
}
input[type=range]::-webkit-slider-thumb {
	margin-top: -14px;
	width: 16px;
	height: 36px;
	background: #ffffff;
	border: 1px solid #000000;
	border-radius: 3px;
	cursor: pointer;
	-webkit-appearance: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
	background: #ffffff;
}
input[type=range]::-moz-range-track {
	background: #ffffff;
	border: 0.2px solid #010101;
	border-radius: 1.3px;
	width: 100%;
	height: 8.4px;
	cursor: pointer;
}
input[type=range]::-moz-range-thumb {
	width: 16px;
	height: 36px;
	background: #ffffff;
	border: 1px solid #000000;
	border-radius: 3px;
	cursor: pointer;
}
input[type=range]::-ms-track {
	background: transparent;
	border-color: transparent;
	border-width: 14.8px 0;
	color: transparent;
	width: 100%;
	height: 8.4px;
	cursor: pointer;
}
input[type=range]::-ms-fill-lower {
	background: #f2f2f2;
	border: 0.2px solid #010101;
	border-radius: 2.6px;
}
input[type=range]::-ms-fill-upper {
	background: #ffffff;
	border: 0.2px solid #010101;
	border-radius: 2.6px;
}
input[type=range]::-ms-thumb {
	width: 16px;
	height: 36px;
	background: #ffffff;
	border: 1px solid #000000;
	border-radius: 3px;
	cursor: pointer;
	margin-top: 0px;
	/*Needed to keep the Edge thumb centred*/
}
input[type=range]:focus::-ms-fill-lower {
	background: #ffffff;
}
input[type=range]:focus::-ms-fill-upper {
	background: #ffffff;
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align:auto) {
	/* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
	input[type=range] {
		margin: 0;
		/*Edge starts the margin from the thumb, not the track as other browsers do*/
	}
}

</style>