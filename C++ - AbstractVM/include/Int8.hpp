#pragma once

#include "IOperand.hpp"
#include "Operand.hpp"
#include <string>

class Int8 : public Operand
{
public:
    Int8(std::string value);
    virtual std::string toString() const; // string that represents the instance
    virtual eOperandType getType() const; // returns the type of instance

private:
    std::string _value;
    eOperandType _type;
};