document.addEventListener('DOMContentLoaded', () => {
    const surveys = [
        {
            formId: 'surveyForm1',
            questionsContainerId: 'questions1',
            chartId: 'myChart1',
            questions: ["Segment 1-1", "Segment 1-2", "Segment 1-3", "Segment 1-4", "Segment 1-5", "Segment 1-6", "Segment 1-7", "Segment 1-8", "Segment 1-9", "Segment 1-10"]
        },
        {
            formId: 'surveyForm2',
            questionsContainerId: 'questions2',
            chartId: 'myChart2',
            questions: ["Segment 2-1", "Segment 2-2", "Segment 2-3", "Segment 2-4", "Segment 2-5", "Segment 2-6", "Segment 2-7", "Segment 2-8", "Segment 2-9", "Segment 2-10"]
        },
        {
            formId: 'surveyForm3',
            questionsContainerId: 'questions3',
            chartId: 'myChart3',
            questions: ["Segment 3-1", "Segment 3-2", "Segment 3-3", "Segment 3-4", "Segment 3-5", "Segment 3-6", "Segment 3-7", "Segment 3-8", "Segment 3-9", "Segment 3-10"]
        }
    ];

    surveys.forEach(survey => {
        const form = document.getElementById(survey.formId);
        const questionsContainer = document.getElementById(survey.questionsContainerId);

        // Создаем вопросы для опросника
        survey.questions.forEach((question, index) => {
            const div = document.createElement('div');
            div.classList.add('question');
            div.innerHTML = `
                <label>${question}</label>
                <div>
                    <input type="radio" id="${survey.formId}question${index + 1}_yes" name="question${index + 1}" value="yes" required>
                    <label for="${survey.formId}question${index + 1}_yes">Да</label>
                    <input type="radio" id="${survey.formId}question${index + 1}_no" name="question${index + 1}" value="no" required>
                    <label for="${survey.formId}question${index + 1}_no">Нет</label>
                </div>
            `;
            questionsContainer.appendChild(div);
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const data = [];

            for (let [key, value] of formData.entries()) {
                data.push(value === 'yes' ? 10 : 0);
            }

            createChart(survey.chartId, data, survey.questions);
        });
    });

    function createChart(chartId, data, labels) {
        const ctx = document.getElementById(chartId).getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 10,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${labels[tooltipItem.dataIndex]}: ${tooltipItem.raw ? 'Да' : 'Нет'}`;
                            }
                        }
                    }
                }
            }
        });
    }
});
