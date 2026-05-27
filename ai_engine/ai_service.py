from ai_engine.response_formatter import generate_complete_analysis


def process_customer_interaction(customer_message):

    result = generate_complete_analysis(customer_message)

    return result



# Test section
if __name__ == "__main__":

    while True:

        customer_input = input("\nCustomer: ")


        if customer_input.lower() == "exit":

            print("\nSession Ended.")
            break


        result = process_customer_interaction(customer_input)


        print("\n========== FINAL AI SERVICE OUTPUT ==========\n")


        for key, value in result.items():

            print(f"{key}: {value}")


        print("\n=============================================\n")